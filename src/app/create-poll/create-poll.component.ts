import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  activePage = 1;
  // Set DatePicker minimum date to todays date
  now: Date = new Date();
  // minDate = {year: 2019, month: 3, day: 15};
  minDate = {year: this.now.getFullYear(),
             month: this.now.getMonth() + 1,
             day: this.now.getDate()};

  constructor(private pollService: PollService,
              private authService: AuthenticationService ) { }

  ngOnInit() {
  }

  registerPoll(form: NgForm) {
    console.log(form);

    const currentDate: Date = new Date();
    const year = form.value.dp.year;
    // Months start with 0 to 11
    const month = form.value.dp.month - 1;
    const day = form.value.dp.day;
    const endDate = new Date(year, month, day);

    const poll: Poll = {
      title: form.value.pollName,
      owner: this.authService.getUserDetails().email,
      access_type: {
        student: form.value.student || false,
        faculty: form.value.faculty || false,
        instructor: form.value.instructor || false
      },
      date_created: currentDate,
      end_date: endDate
    };

    this.pollService.createPoll(poll).subscribe();
  }
}
