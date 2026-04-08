import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class App {
  private githubService = inject(GithubService);
  // cuando hay cambios, Angular renderiza los componentes que dependen de esta variable
  user = signal<GithubUser | null>(null);

  constructor() {
    this.githubService.getUser('torvalds')
      .pipe(takeUntilDestroyed()) // para cancelar la suscripción y evitar fugas de memoria o bugs
      .subscribe(data => this.user.set(data));
  }
}
