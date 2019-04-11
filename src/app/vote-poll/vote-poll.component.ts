import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { AlertService } from '../services/alert.service';
import { Alert, AlertType } from '../models/alert.model';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {

  poll: Poll;
  pollId;
  choices = {};

  constructor(private route: ActivatedRoute,
              private routeNav: Router,
              private pollService: PollService,
              private alertService: AlertService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    let message;
    this.pollId = this.route.snapshot.params['poll_id'];
    this.pollService.getPoll(this.pollId).subscribe(
      (data) => {
        this.poll = data;
        // Check if user accessType matches poll access type
        if ( ! this.hasAccessType(this.authService.getUserDetails().usertype) ) {
          message = "Error: You do not have access to vote in the poll with ID: " + this.pollId;
          this.sendAlert(AlertType.Error, message, true);
          this.routeNav.navigate(['view-polls']);
        }
        // Check if the poll is active
        if ( ! this.hasActiveDate(this.poll.end_date) ) {
          message = 'Error: The poll with ID "' + this.pollId + '" has already ended.';
          this.sendAlert(AlertType.Error, message, true);
          this.routeNav.navigate(['view-polls']);
        }
      },
      (err) => {
        message = 'Error: The poll with ID "' + this.pollId + '" does not exists.';
        this.sendAlert(AlertType.Error, message, true);
        this.routeNav.navigate(['view-polls']);
      });
  }

  select(qIndex, opIndex) {
    this.choices[qIndex] = opIndex;
  }

  submitVote() {
    console.log(Object.keys(this.choices).length);
    console.log(this.poll.questions.length);
    this.pollService.vote(this.pollId, this.choices).subscribe(
      (data) => {
        console.log(data);
        this.routeNav.navigate(['/homepage']);
      },
      (err) => {
        console.log(err);
        this.routeNav.navigate(['/homepage']);
    });
  }

  verifyAllAnswered(): boolean {
    return Object.keys(this.choices).length === this.poll.questions.length;
  }

  hasActiveDate(isoDate): boolean {
    if ( new Date() >= new Date(isoDate) ) {
      return false;
    }
    return true;
  }

  hasAccessType(usertype: String): boolean {
    let hasAccess = false;
    switch (true) {
      case (this.poll.access_type.student && usertype === "Student"):
        hasAccess = true;
        break;
      case (this.poll.access_type.faculty && usertype === "Faculty"):
        hasAccess = true;
        break;
      case (this.poll.access_type.instructor && usertype === "Instructor"):
        hasAccess = true;
        break;
      default:
        hasAccess = false;
    }
    return hasAccess;
  }

  // Send alert to AlertService to display alert
  sendAlert(type: AlertType, message: string, keepAfterRouteChange = false) {
    switch (type) {
      case AlertType.Success:
        console.log(message);
        this.alertService.success(message, keepAfterRouteChange);
        break;
      case AlertType.Error:
        console.error(message);
        this.alertService.error(message, keepAfterRouteChange);
        break;
      case AlertType.Info:
        console.log(message);
        this.alertService.info(message, keepAfterRouteChange);
        break;
      case AlertType.Warning:
        console.log(message);
        this.alertService.success(message, keepAfterRouteChange);
        break;
    }
  }
}
