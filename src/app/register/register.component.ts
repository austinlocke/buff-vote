import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService,
              private router: Router) { }

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
    this.registerService.registerUser(user)
      .subscribe(data => {
        const response: any = data;
        if (response.status !== 200) {
          console.log("An error has occured.");
        }
        else {
          this.router.navigate(['/', 'dashboard']);
        }
    });
  }

  log(element) {
    console.log(element)
  } 

}
