module.exports = {

  // Create a connection to Multichain
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

  // Create multiple assets for each poll option
  // Input: Poll object
  // Return: Promise with results or error
  createAsset: async function(poll) {
    mc = this.initiateMultichain();

    let awaitPromise = [];
    for(let question of poll.questions) {
      for(let option of question.options) {
        awaitPromise.push(new Promise( (resolve, reject) => {
          mc.issue({address: "13ZS6UQYbjwQoU1rCzH4QrVhZm6PYQFtHvNqMM", asset: option._id, qty: 50000, units: 1.00, details: {pollId: poll._id, questionId: question._id}},
          (err, res) => {
            if (err) {
              reject(err);
            }
            else {
              resolve(res);
            }
          })
        }));
      }
    }
    // Await for all promises to resolve.
    await Promise.all(awaitPromise).then( result => {
      console.log("Successfully created assets for poll id \"" + poll._id + "\"");
      console.log(result);
      return Promise.resolve(result);
    }).catch(err => {
      console.log("Error while creating assets for poll id \"" + poll._id + "\"");
      return Promise.reject(err);
    });
  },

  // Increase each asset the user choiced to vote for
  // Input: Array of Choices object {pollId, optionId, questionId}
  // Return: Promise with results or error
  sendAsset: async function(choices) {
    mc = this.initiateMultichain();

    pollId = choices[0].pollId || ""
    let awaitPromise = [];
    for(let choice of choices) {
      awaitPromise.push(new Promise( (resolve, reject) => {
        mc.sendAssetFrom({from: "13ZS6UQYbjwQoU1rCzH4QrVhZm6PYQFtHvNqMM", to: "1LcyUTRsSDSKsaLNBJkZcVxFNEjVTGzgkkbtMb", asset: choice.optionId, qty: 1 },
        (err, res) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        })
      }));
    }
    // Await for all promises to resolve.
    await Promise.all(awaitPromise).then( result => {
      console.log("Successfully added votes to poll id \"" + pollId + "\"");
      console.log(result);
      return Promise.resolve(result);
    }).catch(err => {
      console.log("Error while adding votes to assets for poll id \"" + pollId + "\"");
      console.log(err);
      return Promise.reject(err);
    });
  },

  // Get multiple assets for all options in a Poll
  // Input: Poll object
  // Return: Promise with results or error
  //         The result will contain an array of Objects with
  //         { name:, assetref:, qty:}.
  getAssetBalance: async function(poll) {
    mc = this.initiateMultichain();

    assetNames = [];

    for(let question of poll.questions) {
      for(let option of question.options) {
        assetNames.push(option._id);
      }
    }

    return new Promise((resolve, reject) => {
      mc.getMultiBalances({
        addresses: "1LcyUTRsSDSKsaLNBJkZcVxFNEjVTGzgkkbtMb",
        assets: assetNames
      },
      (err, res) => {
        if (err) {
          console.log("Error while retrieving votes from assets for poll id \"" + poll._id + "\"");
          console.log(err);
          reject(err);
        }
        else {
          console.log("Successfully retrieved votes from assets for poll id \"" + poll._id + "\"")
          resolve(res);
        }
      })
    });
  }

}
