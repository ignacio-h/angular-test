# Devpulse

A single-page application built with Angular 21 for exploring GitHub profiles and repository activity.

Developed as a hands-on learning project to explore modern Angular architecture: standalone components, signal-based reactivity, RxJS pipelines, and lazy-loaded routing — all without third-party UI libraries.

## Tech highlights

- **Angular 21** with zoneless change detection
- **Signals** for local state management (`signal`, `computed`, `toSignal`)
- **RxJS** for async data flow: `debounceTime`, `switchMap`, `distinctUntilChanged`, `forkJoin`
- **Lazy-loaded routing** with `loadComponent`
- **GitHub REST API** — no authentication required
- Pure CSS with component-scoped styles

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

or:

```bash
ng g c component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
