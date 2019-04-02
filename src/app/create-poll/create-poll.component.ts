import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  activePage = 0;
  // Set DatePicker minimum date to todays date
  now: Date = new Date();
  // minDate = {year: 2019, month: 3, day: 15};
  minDate = {
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate()
  };
  pollForm: FormGroup;
  questions: FormArray;

  constructor(private pollService: PollService,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      pollName: "",
      studentAccess: false,
      facultyAccess: false,
      instructorAccess: false,
      endDate: this.minDate,
      questions: this.formBuilder.array([ this.createQuestion() ])
    });
  }

  registerPoll(form: NgForm) {
    console.log(form);

    const currentDate: Date = new Date();
    const year = form.value.endDate.year;

    // Months start with 0 to 11
    const month = form.value.endDate.month - 1;
    const day = form.value.endDate.day;
    const endDate = new Date(year, month, day, 23, 59, 59);
    console.log(endDate);
    const poll: Poll = {
      title: form.value.pollName,
      owner: this.authService.getUserDetails().email,
      access_type: {
        student: form.value.studentAccess || false,
        faculty: form.value.facultyAccess || false,
        instructor: form.value.instructorAccess || false
      },
      questions: form.value.questions,
      date_created: currentDate,
      end_date: endDate
    };

    this.pollService.createPoll(poll).subscribe();
  }

  createQuestion() {
    return this.formBuilder.group({
      questionTitle: '',
      options: this.formBuilder.array([this.createOption(), this.createOption()])
    });
  }

  createOption() {
    return this.formBuilder.group({
      option: this.formBuilder.control("")
    });
  }

  addQuestion(): void {
    this.questions = this.pollForm.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
  }

  addOption(questionIndex: number): void {
    const questions = this.pollForm.get('questions') as FormArray;
    const question = questions.controls[questionIndex] as FormGroup;
    const options = question.controls.options as FormArray;
    options.push(this.createOption());
  }

  getDate() {
    const year = this.pollForm.value.endDate.year;
    const month = this.pollForm.value.endDate.month - 1;
    const day = this.pollForm.value.endDate.day;
    const endDate = new Date(year, month, day);
    return endDate.toLocaleDateString();
  }

  getStudentAccess() {
    return this.pollForm.value.studentAccess ? "yes" : "no";
  }

  getFacultyAccess() {
    return this.pollForm.value.facultyAccess ? "yes" : "no";
  }

  getInstructorAccess() {
    return this.pollForm.value.instructorAccess ? "yes" : "no";
  }
}
