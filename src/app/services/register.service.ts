import { HttpClient } from "@angular/common/http";
import { RegisterUser } from '../models/register.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class RegisterService {

  constructor(private http: HttpClient) {}

  addPost(user: RegisterUser) {
    this.http.post("http://localhost:3000/api/user", user)
      .subscribe();
  }
}
