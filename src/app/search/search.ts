import { Component, computed, inject, signal } from '@angular/core';
import { GithubUser } from '../models/github.models';
import { GithubService } from '../github';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap, catchError, of, tap } from 'rxjs';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-search',
  imports: [UserCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private githubService = inject(GithubService);

  // estado de la búsqueda
  username = signal('');
  user = signal<GithubUser | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  isValidUsername = computed(() => this.username()?.trim().length >= 3);

  // puente entre el evento del imput y el rxjs
  private search$ = new Subject<string>();

  constructor() {
    this.search$
    .pipe(
      tap(() => {
        // tap: ejecuta un efecto secundario sin modificar el flujo
        this.isLoading.set(true);
        this.error.set(null);
        this.user.set(null);
      }),
      switchMap(username => this.githubService.getUser(username).pipe(
        // switchMap: cancela la petición anterior si llega una nueva
        catchError(err => {
          // catchError: captura errores y devuelve un nuevo observable para no terminarlo y dejar de escuchar búsquedas futuras
          this.error.set(err.status === 404 
            ? 'Usuario no encontrado'
            : 'Error al buscar el usuario'
          );
          return of(null); // devuelve un observable con null para continuar el flujo
        })
      )),
      takeUntilDestroyed() // se completa automáticamente al destruir el componente
    )
    .subscribe(data => {
      this.isLoading.set(false);
      if (data)
        this.user.set(data);
    })
  }

  onSearch(): void {
    if (this.isValidUsername())
      this.search$.next(this.username().trim());
  }
}
