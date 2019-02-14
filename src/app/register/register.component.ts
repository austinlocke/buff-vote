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

  nodeErrors: nodeErrors = {
    duplicateEmailError: false
  };

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit(): void {

  }

  onRegister(form: NgForm) {
    const user: User = {
      fname: form.value.fname,
      lname: form.value.lname,
      email: form.value.email,
      type_of_user: form.value.type_of_user,
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
        this.router.navigate(['/', 'dashboard']);
      },
      errResponse => {
        console.log(errResponse)
        let errMessage = errResponse.error.error;
        if (errMessage.includes("User validation failed: email: Error, expected `email` to be unique.")) {
          this.nodeErrors.duplicateEmailError = true;
        }
      });
    this.auth.sendVerification(user).subscribe();
  }

  log(element) {
    console.log(element);
  }

}
