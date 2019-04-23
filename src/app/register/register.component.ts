import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export interface nodeErrors {
  duplicateEmailError: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  passwordPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[" + this.specialCharacters + "]).{8,}";

  nodeErrors: nodeErrors = {
    duplicateEmailError: false
  };

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      if (!this.auth.getUserDetails().verified) {
        this.auth.logout();
      }
      this.router.navigate(['/homepage']);
    }
  }

  onRegister(form: NgForm) {
    const user: User = {
      fname: form.value.fname,
      lname: form.value.lname,
      email: form.value.email,
      usertype: form.value.usertype,
      password: form.value.password,
      classification: form.value.classification,
      major: form.value.major,
      department: form.value.department,
      city: form.value.city,
      state: form.value.state,
      zip: form.value.zip
    };

    this.auth.register(user)
      .subscribe( () => {
        this.auth.sendVerification(this.auth.getUserDetails()).subscribe();
        this.router.navigate(['/', 'dashboard']);
        console.log(this.auth.getUserDetails().verified);
      },
      errResponse => {
        console.log(errResponse)
        let errMessage = errResponse.error.error;
        if (errMessage.includes("User validation failed: email: Error, expected `email` to be unique.")) {
          this.nodeErrors.duplicateEmailError = true;
        }
      });

  }

  log(element) {
    console.log(element);
  }

}
