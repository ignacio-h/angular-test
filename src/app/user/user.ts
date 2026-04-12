import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../github';
import { GithubUser, GithubRepo } from '../models/github.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, forkJoin } from 'rxjs';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user',
  imports: [UserCard],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private githubService = inject(GithubService);

  user = signal<GithubUser | null>(null);
  repos = signal<GithubRepo[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const username = params.get('username') ?? '';
        return forkJoin({
          user: this.githubService.getUser(username!),
          repos: this.githubService.getRepos(username!)
        }).pipe(
          catchError(() => {
            this.error.set('Usuario no encontrado');
            return of(null);
          })
        )
      }),
      takeUntilDestroyed()
    ).subscribe(data => {
      this.isLoading.set(false);
      if (data) {
        this.user.set(data.user);
        this.repos.set(data.repos.filter(r => !r.fork)); // Sólo repos originales
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
