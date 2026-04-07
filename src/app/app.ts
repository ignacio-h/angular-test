import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCard } from './user-card/user-card';
import { GithubUser } from './models/github.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // demo con datos hardcodeados
  testUser: GithubUser = {
    login: 'torvalds',
    name: 'Linus Torvalds',
    avatar_url: 'https://avatars.githubusercontent.com/u/1024025',
    public_repos: 8,
    followers: 230000,
    following: 0,
    bio: 'Nothing to see here, move along.',
    html_url: 'https://github.com/torvalds'
  }
}
