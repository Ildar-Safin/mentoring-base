import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from "./user.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersApiService } from "../../users-api.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private usersApiService: UsersApiService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.load),
      mergeMap(() =>
        this.usersApiService.getUsers().pipe(
          map(users => UserActions.loadSuccess({ users })),
          catchError(error => of(UserActions.loadFailure({ error: error.message })))
        )
      )
    )
  );
}
