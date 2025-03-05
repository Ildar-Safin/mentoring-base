import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../../interfaces/todo-interface";

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'set': props<{todo: Todo[]}>(),
    'edit': props<{ todo: Todo }>(),
    'create': props<{ todo: Todo }>(),
    'delete': props<{ id: number }>(),
    'Load Todos': emptyProps(),  // Экшен для запроса задач
    'Load Todos Success': props<{ todos: Todo[] }>(),  // Если успешно
    'Load Todos Failure': props<{ error: string }>(),  // Если ошибка
  },
});
