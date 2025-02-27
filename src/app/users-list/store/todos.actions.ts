import {createActionGroup, props} from "@ngrx/store";
import {Todo} from "../../interfaces/todo-interface";

export const TodosActions = createActionGroup({
  source: 'Todo',
  events: {
    'set': props<{todo: Todo[]}>(),

    'edit': props<{ todo: Todo }>(),

    'create': props<{ todo: Todo }>(),
    'delete': props<{ id: number }>(),
  },
});
