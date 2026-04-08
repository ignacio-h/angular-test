import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCard } from './user-card/user-card';
import { GithubUser } from './models/github.models';
import { GithubService } from './github';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private githubService = inject(GithubService);
  // cuando hay cambios, Angular renderiza los componentes que dependen de esta variable
  user = signal<GithubUser | null>(null);

  ngOnInit(): void {
    this.githubService.getUser('torvalds').subscribe(data => {
      this.user.set(data);
    })
  }
}
