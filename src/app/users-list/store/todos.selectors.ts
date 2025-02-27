import {createSelector} from "@ngrx/store";
import {Todo} from "../../interfaces/todo-interface";

interface TodoState {
  todo: Todo[];
}

interface AppState {
  todo: TodoState;
}

export const selectTodosFeature = (state: AppState) => state.todo;

export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.todo
);
