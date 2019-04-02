import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll } from '../models/poll.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  poll: Poll;
  pollId;
  choices = {};
  activePage = 0;
  constructor(private pollService: PollService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.pollId = this.router.snapshot.params['poll_id'];
    this.pollService.getPoll(this.pollId)
      .subscribe(
      (data) => {
        this.poll = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
    });
  }

  select(qIndex, opIndex) {
    this.choices[qIndex] = opIndex;
    console.log(this.choices);
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

  getStudentAccess() {
    return this.poll.access_type.student ? "yes" : "no";
  }

  getFacultyAccess() {
    return this.poll.access_type.faculty ? "yes" : "no";
  }

  getInstructorAccess() {
    return this.poll.access_type.instructor ? "yes" : "no";
  }

}
