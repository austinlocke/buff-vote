import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../models/poll.model';
import { PollService } from '../services/poll.service';
import { AlertService } from '../services/alert.service';
import { Alert, AlertType } from '../models/alert.model';
import { AuthenticationService } from '../services/authentication.service';

export interface PollChoices {
  userId: String;
  pollId: String;
  questionId: String;
  optionId: String;
}


@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {

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
    this.pollService.getPoll(this.pollId).subscribe(
      (data) => {
        this.poll = data;
        console.log(this.poll);
        const userId: string = "" || this.authService.getUserDetails()._id ;
        // Check if user has already voted
        if (this.poll.usersVoted.findIndex( (search: string) => {
          console.log(search);
          return search === userId;
        }) >= 0) {
          message = "Error: You have already voted in the poll \"" + this.poll.title + "\"";
          this.sendAlert(AlertType.Error, message, true);
          this.routeNav.navigate(['view-polls']);
        }
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
    console.log("Choices: ");
    console.log(this.choices);
    for (let i = 0; i < this.poll.questions.length; i++ ) {
      this.pollChoices[i] = {
        userId: this.authService.getUserDetails()._id,
        pollId: this.poll._id,
        questionId: this.poll.questions[i]._id,
        optionId: this.poll.questions[i].options[this.choices[i]]._id
      };
    }

    console.log(this.pollChoices);
    let message: string;
    this.pollService.vote(this.pollId, this.pollChoices).subscribe(
      (data) => {
        console.log(data);
        message = "You successfully voted in poll \"" + this.poll.title + "\".";
        this.sendAlert(AlertType.Success, message, true);
        this.routeNav.navigate(['/homepage']);
      },
      (err) => {
        console.log(err);
        if (err.error.reason === "Already Voted") {
          message = "You have already voted in the poll \"" + this.poll.title + "\"";
        } else {
          message = "An error has occurred while voting in the poll \"" + this.poll.title + "\". Please try again later.";
        }
        this.sendAlert(AlertType.Error, message, true);
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
