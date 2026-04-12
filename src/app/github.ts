// ng g s github
// ng generate service github

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser, GithubRepo } from './models/github.models';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.github.com';

  getUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.baseUrl}/users/${username}`);
  }

  getRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=5`
    );
  }
}
