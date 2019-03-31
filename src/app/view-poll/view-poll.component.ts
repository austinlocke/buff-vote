import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {
  polls: Poll[];

  constructor(private pollService: PollService,
              private auth: AuthenticationService) { }

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

}
