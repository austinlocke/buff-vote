import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    console.log("Form submitted");
    console.log(form.value);
    const user: User = {
      fname: form.value.fname,
      lname: form.value.lname,
      email: form.value.email,
      type_of_user: form.value.type_of_user,
      hashed_pash: form.value.password, // ????
      classification: form.value.classification,
      major: form.value.major,
      department: form.value.department,
      city: form.value.city,
      state: form.value.state,
      zip: form.value.zip
    };
    this.registerService.addPost(user);
  }

}
