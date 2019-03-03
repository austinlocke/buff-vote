import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private pollService: PollService,
              private authService: AuthenticationService ) { }

  ngOnInit() {
  }

  registerPoll(form: NgForm) {
    console.log(form);

    const currentDate: Date = new Date();
    let endDate = new Date();
    switch(form.value.duration) {
      case '1':
        endDate.setDate(currentDate.getDate() + 1);
        break;
      case '2':
        endDate.setDate(currentDate.getDate() + 7);
        break;
      case '3':
        endDate.setDate(currentDate.getDate() + 14);
        break;
      case '4':
        endDate.setMonth(currentDate.getMonth() + 1);
        break;
    }

    const poll: Poll = {
      title: form.value.pollName,
      owner: this.authService.getUserDetails().email, // need to get user email. Either do this here or in back end.
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
