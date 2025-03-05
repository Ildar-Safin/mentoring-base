import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosApiService } from "../../todos-api.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { TodosActions } from "./todos.actions";

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todosService = inject(TodosApiService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      mergeMap(() =>
        this.todosService.getTodos().pipe(
          map(todos => TodosActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodosActions.loadTodosFailure({ error: error.message })))
        )
      )
    )
  );
}
