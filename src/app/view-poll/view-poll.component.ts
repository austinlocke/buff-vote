import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {
  polls: Poll[];

  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.pollService.getPolls()
      .subscribe(
      (data) => {
        this.polls = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
    });
  }

}
