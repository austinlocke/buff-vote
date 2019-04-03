import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {

  poll;
  pollId;
  choices = {};

  constructor(private route: ActivatedRoute, private routeNav: Router, private pollService: PollService) { }

  ngOnInit() {
    this.pollId = this.route.snapshot.params['poll_id'];
    this.pollService.getPoll(this.pollId).subscribe(
      (data) => {
        this.poll = data;
    });
  }

  select(qIndex, opIndex) {
    this.choices[qIndex] = opIndex;
  }

  submitVote() {
    this.pollService.vote(this.pollId, this.choices).subscribe(
      (data) => {
        this.routeNav.navigate(['/homepage']);
      },
      (err) => {
        console.log(err);
    });
  }
}
