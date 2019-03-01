import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  activePage = 1;

  constructor() { }

  ngOnInit() {
  }

  registerPoll(form: NgForm) {
    console.log(form);
  }
}
