import { Component, OnInit } from '@angular/core';
import { Credentials, AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  credentials: Credentials = {
    email: null,
    password: null
  };

  constructor(public auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.credentials = {
      email: form.value.email,
      password: form.value.password
    };

    this.auth.login(this.credentials)
      .subscribe( (data) => {
        console.log(data)
        this.router.navigate(['/dashboard']);
      },
      errMessage => {
        console.log(errMessage);
      });
  }

}
