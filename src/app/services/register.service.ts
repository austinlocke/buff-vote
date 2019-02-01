import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class RegisterService {

  constructor(private http: HttpClient) {}

  addPost(user: User) {
    this.http.post("http://localhost:3000/api/user", user)
      .subscribe();
  }
}
