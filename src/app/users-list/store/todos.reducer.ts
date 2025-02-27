import {Todo} from "../../interfaces/todo-interface";
import {createReducer, on} from "@ngrx/store";
import {TodosActions} from "./todos.actions";

const initialState: { todo: Todo[]} = {
  todo: [],
};
export const todoReducer = createReducer(
  initialState,
  on(TodosActions.set, (state, payload) =>({
    ...state,
    todo: payload.todo,
  })),
  on(TodosActions.edit, (state, payload) =>({
    ...state,
    todo: state.todo.map((todo) => {
      if (todo.id === payload.todo.id) {
        return payload.todo;
      } else {
        return todo;
      }
    }),
  })),
  on(TodosActions.create, (state, payload) =>({
    ...state,
    todo: [...state.todo, payload.todo],
  })),
  on(TodosActions.delete, (state, payload) =>({
    ...state,
    todo: state.todo.filter((todo) => todo.id !== payload.id),
  })),
);
