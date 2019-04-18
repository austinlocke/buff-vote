import { Component, OnInit } from '@angular/core';
import { Credentials, AuthenticationService, UserDetails } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
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

  loading: boolean = false;

  constructor(private auth: AuthenticationService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.loading = true;
    this.credentials = {
      email: form.value.email,
      password: form.value.password
    };

    this.auth.login(this.credentials)
      .subscribe( (data) => {
        this.loading = false;
        this.router.navigate(['/homepage']);
      },
      errMessage => {
        this.alertService.clear();
        if (errMessage.statusText === "Unauthorized") {
          this.alertService.error("You have entered an invalid email or password.", false);
        } else {
          this.alertService.error("An error has occured when trying to login. Please try again later.", false);
        }

        // console.log(errMessage);
        this.loading = false;
    });
  }

}
