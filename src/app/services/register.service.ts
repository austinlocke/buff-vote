import { HttpClient } from "@angular/common/http";
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class RegisterService {

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post("http://localhost:3000/api/user", user);
  }
}
