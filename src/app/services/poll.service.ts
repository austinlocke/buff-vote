import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  polls: Poll[];

  constructor(private http: HttpClient,
              private router: Router) { }

  private request(method: 'post'|'get', type: 'createPoll' | 'findAllPoll' | 'findOnePoll',
                  extention?: String, poll?: Poll): Observable<any> {
    let base;
    let path;
    if (extention == null) {
      path = type;
    } else {
      path = type + extention;
    }

    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/api/${type}`, poll);
    } else {
      base = this.http.get(`http://localhost:3000/api/${path}`);
    }

    return base;
  }

  public createPoll(poll: Poll): Observable<any> {
    return this.request('post', 'createPoll', null, poll);
  }

  public getPolls(accessType: string): Observable<any> {
    const path = '/accessType/' + accessType;
    return this.request('get', 'findAllPoll', path, null);
  }

  public getPoll(pollId: string): Observable <any> {
    const path = `/${pollId}`;
    return this.request('get', 'findOnePoll', path);
  }
}
