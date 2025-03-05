import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from '@ngrx/store';
import { userReducer } from "./users-list/store/users.reducer";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from "./users-list/store/todos.reducer";
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from "./users-list/store/user.effects";
import { TodoEffects } from "./users-list/store/todos.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideStore({
        users: userReducer,
        todo: todoReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(UserEffects, TodoEffects)
]
};
