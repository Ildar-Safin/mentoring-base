import { createSelector } from "@ngrx/store";
import { Todo } from "../../interfaces/todo-interface";

interface TodoState {
  todo: Todo[];
  loading: boolean;
  error: string | null;
}

interface AppState {
  todo: TodoState;
}

export const selectTodosFeature = (state: AppState) => state.todo;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.todo
);

export const selectTodosLoading = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.loading
);

export const selectTodosError = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.error
);
