import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

export interface UserDetails {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  exp: number;
  iat: number;
  verified: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  private saveToken(token: string) {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    }
    return false;
  }

  private request(method: 'post'|'get', type: 'login'|'verification'|'register'|'dashboard',
                    user?: User|Credentials|UserDetails): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/api/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: User): Observable<any> {
    return this.request('post', 'register', user);
  }

  public sendVerification(userDetails: UserDetails ): Observable<any> {
    return this.request('post', 'verification', userDetails);
  }

  public login(cred: Credentials): Observable<any> {
    return this.request('post', 'login', cred);
  }

  public profile(): Observable<any> {
    return this.request('get', 'dashboard');
  }
}
