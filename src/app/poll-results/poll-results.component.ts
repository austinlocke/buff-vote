import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css']
})
export class PollResultsComponent implements OnInit {
  polls: Poll[];

  constructor(private pollService: PollService,
              private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.pollService.getPolls(this.auth.getUserDetails().usertype)
      .subscribe(
      (data) => {
        this.polls = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
    });
  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

  log(str) {
    console.log(str);
  }

  navigate(poll) {
    this.router.navigate(['view-single-poll', poll._id]);
  }
}

