import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./search/search').then(m => m.Search)
    },
    {
        path: 'user/:username',
        loadComponent: () => import('./user/user').then(m => m.User)
    },
    // ruta comodín para redirigir a la raíz si no se encuentra la ruta
    // importante poner al final porque se evalúan en orden
    {
        path: '**',
        redirectTo: ''
    }
];
