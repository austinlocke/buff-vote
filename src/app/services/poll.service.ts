import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Poll } from '../models/poll.model';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class PollService {

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

  private request(method: 'post'|'get', type: 'createPoll' | 'findAllPoll', poll?: Poll): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/api/${type}`, poll);
    } else {
      base = this.http.get(`http://localhost:3000/api/${type}`); //{ headers: { Authorization: `Bearer ${this.getToken()}` }});
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

  public createPoll(poll: Poll): Observable<any> {
    return this.request('post', 'createPoll', poll);
  }

  public getPolls(): Observable<any> {
    return this.request('get', 'findAllPoll');
  }
}
