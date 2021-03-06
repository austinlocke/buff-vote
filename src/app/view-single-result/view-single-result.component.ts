import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll.model';
import { PollChoices } from '../vote-poll/vote-poll.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from '../services/poll.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertType } from '../models/alert.model';

@Component({
  selector: 'app-view-single-result',
  templateUrl: './view-single-result.component.html',
  styleUrls: ['./view-single-result.component.css']
})
export class ViewSingleResultComponent implements OnInit {

  poll: Poll;
  pollId;
  choices = {};
  pollChoices: PollChoices[] = [];

  constructor(private route: ActivatedRoute,
              private routeNav: Router,
              private pollService: PollService,
              private alertService: AlertService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    let message;
    this.pollId = this.route.snapshot.params['poll_id'];
    this.pollService.getPollResult(this.pollId).subscribe(
      (data) => {
        this.poll = data;
        console.log(this.poll)
        // Check if user accessType matches poll access type
        if ( ! this.hasAccessType(this.authService.getUserDetails().usertype) ) {
          message = "Error: You do not have access to view the poll with ID: " + this.pollId;
          this.sendAlert(AlertType.Error, message, true);
          this.routeNav.navigate(['poll-results']);
        }
      },
      (err) => {
        message = 'Error: The poll with ID "' + this.pollId + '" does not exists.';
        this.sendAlert(AlertType.Error, message, true);
        this.routeNav.navigate(['poll-results']);
      });
  }

  hasAccessType(usertype: String): boolean {
    let hasAccess = false;
    console.log(`${usertype} ${this.poll.access_type.student} ${this.poll.access_type.faculty} ${this.poll.access_type.instructor}`)
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

  max(question, option) {
    let maxOp = question.options[0];
    question.options.forEach(option => {
      maxOp = option.qty > maxOp.qty ? option : maxOp;
    });
    let maxQuant = maxOp.qty;
    return option.qty === maxQuant
  }
}
