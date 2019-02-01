import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class RegisterService {

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post("http://localhost:3000/api/user", user)
      .subscribe(data => {
        const response: any = data;
        if (response.status !== 200) {
          console.log("An error has occured.");
        }
      });
  }
}
