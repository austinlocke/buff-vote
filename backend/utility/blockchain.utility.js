module.exports = {

  initiateMultichain: function() {
    // Change password, located in /root/.multichain/medium-demo-multichain/multichain.conf
    let multichain = require("multichain-node")({
      port: 6270,
      host: '68.183.19.8',
      user: "multichainrpc",
      pass: "FF2jPhLCVZiDjr6LZewJp4eA7JJVqcnrsK6PgHvCADG7" //chain1
    });
    return multichain;
  },

  createAsset: function(poll) {

    mc = this.initiateMultichain();

    for(let question of poll.questions) {
      for(let option of question.options) {
        mc.issue({address: "13ZS6UQYbjwQoU1rCzH4QrVhZm6PYQFtHvNqMM", asset: option._id, qty: 50000, units: 1.00, details: {pollId: poll._id, questionId: question._id}})
          .catch( err => {
            console.log("Error:");
            console.log(err);
          });
      }
    }
  },

  sendAsset: function(assetName) {
    mc = this.initiateMultichain();

    mc.sendAssetFrom({from: "13ZS6UQYbjwQoU1rCzH4QrVhZm6PYQFtHvNqMM", to: "1LcyUTRsSDSKsaLNBJkZcVxFNEjVTGzgkkbtMb", asset: assetName, qty: 1 })
      .catch( err => {
        console.log("Error:");
        console.log(err);
      });
  },

  getAssetBalance: async function(poll) {
    mc = this.initiateMultichain();

    assetName = [];

    for(let question of poll.questions) {
      for(let option of question.options) {
        assetName.push(option._id);
      }
    }
    console.log(assetName);
    result = await mc.getMultiBalances({
      addresses: "1LcyUTRsSDSKsaLNBJkZcVxFNEjVTGzgkkbtMb",
      assets: assetName
    });

    console.log(result);

    //return result;
  }

}
