import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-poll',
  templateUrl: './manage-poll.component.html',
  styleUrls: ['./manage-poll.component.css']
})
export class ManagePollComponent implements OnInit {
  polls: Poll[];
  activePolls: Poll[] = [];
  endedPolls: Poll[] = [];
  currentDate = Date();
  activePage = 0;
  constructor(private pollService: PollService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.pollService.getUserPolls(this.auth.getUserDetails().email)
      .subscribe(
      (data) => {
        this.polls = data;
        console.log(data);
        this.seperatePolls();
      },
      (err) => {
        console.log(err);
    });
  }

  seperatePolls() {
    this.polls.forEach( (polls) => {
      if (this.checkDate(polls.end_date)) {
        this.activePolls.push(polls);
      } else {
        this.endedPolls.push(polls);
      }
    });
  }

  checkDate(isoDate) {
    if ( new Date() >= new Date(isoDate) ) {
      return false;
    }
    return true;
  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

}
