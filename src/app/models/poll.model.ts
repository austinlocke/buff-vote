export interface Poll {
  title: String;
  owner: String;
  access_type: {
    student: Boolean,
    faculty: Boolean,
    instructor: Boolean
  };
  date_created: Date;
  end_date: Date;
}
