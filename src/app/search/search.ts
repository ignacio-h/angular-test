import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../github';
import { takeUntilDestroyed, toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of, filter, tap, map } from 'rxjs';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-search',
  imports: [UserCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private githubService = inject(GithubService);
  private router = inject(Router);

  // estado de la búsqueda
  username = signal('');
  isLoading = signal(false);
  error = signal<string | null>(null);

  isValidUsername = computed(() => this.username()?.trim().length >= 3);

  user = toSignal(
    toObservable(this.username).pipe(
      debounceTime(400),
      map(username => username.trim()),
      distinctUntilChanged(), // Filtra emisiones consecutivas con el mismo valor
      filter(username => username.length >= 3),
      tap(() => {
        this.isLoading.set(true);
        this.error.set(null)
      }),
      switchMap(username => 
        this.githubService.getUser(username).pipe(
          catchError(err => {
            const msg = err.status === 404
              ? `Usuario ${username} no encontrado`
              : 'Error al conectar con GitHub';
            this.error.set(msg);
            return of(null);
          })
        )
      ),
      tap(() => this.isLoading.set(false)),
      takeUntilDestroyed()
    ),
    { initialValue: null }
  );

  navigateToProfile(username: string): void {
    this.router.navigate(['/user', username]);
  }
}
