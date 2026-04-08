// ng g s github
// ng generate service github

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser } from './models/github.models';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.github.com';

  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.baseUrl}/users/${username}`);
  }
}
