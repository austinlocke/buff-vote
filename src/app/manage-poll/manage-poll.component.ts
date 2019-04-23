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
  hasActivePolls = true;
  hasEndedPolls = true;
  currentDate = Date();
  activePage = 0;
  loading: boolean = true;

  constructor(private pollService: PollService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.pollService.getUserPolls(this.auth.getUserDetails().email)
      .subscribe(
      (data) => {
        this.loading = false;
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

    if (this.activePolls.length === 0) {
      this.hasActivePolls = false;
    }
    if (this.endedPolls.length === 0) {
      this.hasEndedPolls = false;
    }

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

  navigate(poll) {
    this.router.navigate(['view-result', poll._id]);
  }

}
