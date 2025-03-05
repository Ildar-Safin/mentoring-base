import { Todo } from "../../interfaces/todo-interface";
import { createReducer, on } from "@ngrx/store";
import { TodosActions } from "./todos.actions";

interface TodoState {
  todo: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todo: [],
  loading: false,
  error: null
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
      return todo.id === payload.todo.id ? payload.todo : todo;
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
  on(TodosActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodosActions.loadTodosSuccess, (state, payload) => ({
    ...state,
    todo: payload.todos, // Обновляем массив todo
    loading: false
  })),
  on(TodosActions.loadTodosFailure, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error
  }))
);
