import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
  msg1: String;
  msg2: String;
  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    // if user account is already verified, redirect them to dashboard.
    if (this.auth.getUserDetails().verified) {
      this.router.navigate(['/dashboard']);
    }
    this.msg1 = "Your account has been registered, please check your email (" +
                this.auth.getUserDetails().email + ") to verify your account.";
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
