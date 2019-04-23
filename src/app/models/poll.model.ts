export interface Poll {
  _id: String;
  title: String;
  owner: String;
  access_type: {
    student: Boolean,
    faculty: Boolean,
    instructor: Boolean
  };
  questions: [{
    _id: String;
    questionTitle: String,
    options: [{
      _id: String;
      option: String
    }]
  }];
  date_created: Date;
  end_date: Date;
}

export interface PollResults {
  _id: String;
  title: String;
  owner: String;
  access_type: {
    student: Boolean,
    faculty: Boolean,
    instructor: Boolean
  };
  questions: [{
    _id: String;
    questionTitle: String,
    options: [{
      _id: String;
      option: String
      qty: Number
    }]
  }];
  date_created: Date;
  end_date: Date;
}
