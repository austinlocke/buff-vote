import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
  msg1: String;
  msg2: String;
  token: String;
  constructor(private auth: AuthenticationService,
              private alertService: AlertService,
              private routeNav: Router,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.router.snapshot.params['token'];

    // if user account is already verified, redirect them to dashboard.
    if (this.auth.isLoggedIn()) {
      if (this.auth.getUserDetails().verified) {
        this.routeNav.navigate(['/homepage']);
      } else {
        this.msg1 = "Your account has been registered, please check your email (" +
                  this.auth.getUserDetails().email + ") to verify your account.";
      }
    }

    if (this.token) {
      let message;
      this.auth.sendConfermation(this.token)
        .subscribe( (result) => {
          console.log(result);
          message = "Your email has been verified";
          if (this.auth.isLoggedIn()) {
            this.auth.logout(message);
          } else {
            this.alertService.success(message, true);
            this.routeNav.navigate(['/']);
            return;
          }
        },
        errMessage => {
          console.log(errMessage);
          this.alertService.clear();
          if (errMessage.error === "Error: The verification is invalid or has expired") {
            message = "Error: The verification is invalid or has expired";
          } else {
            message = "An error has occured when verifing your account. Please try again later."
          }

          if (this.auth.isLoggedIn()) {
            this.alertService.error(message, false);
          } else {
            this.alertService.error(message, true);
            this.routeNav.navigate(['/']);
          }


          // console.log(errMessage);
      });
    }


  }

  sendVerification() {
    this.auth.sendVerification(this.auth.getUserDetails())
      .subscribe();
    this.msg2 = "A new email has been sent, please check your email again.";
  }

  log(element) {
    console.log(element);
  }

}
