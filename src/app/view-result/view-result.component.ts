import { Component, OnInit } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Poll, PollResults } from '../models/poll.model';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  poll: PollResults;
  pollId;
  choices = {};
  activePage = 0;
  constructor(private pollService: PollService,
              private authService: AuthenticationService,
              private alertService: AlertService,
              private routeNav: Router,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.pollId = this.router.snapshot.params['poll_id'];
    this.pollService.getPollResult(this.pollId)
      .subscribe(
      (data) => {
        this.poll = data;
        // If user does not own that poll, navigate back to manage polls
        if (this.poll.owner !== this.authService.getUserDetails().email) {
          console.error("Error: You are not the owner of pollID " + this.pollId);

          this.alertService.error("Error: You do not have access to view the poll with ID " + this.pollId, true);
          this.routeNav.navigate(['manage-polls']);
        }
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
