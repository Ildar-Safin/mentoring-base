import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../interfaces/user-interface";

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'set': props<{users: User[]}>(),
    'edit': props<{ user: User }>(),
    'create': props<{ user: User }>(),
    'delete': props<{ id: number }>(),
    'Load': emptyProps(),
    'Load Success': props<{ users: User[] }>(),
    'Load Failure': props<{ error: string }>(),
},
});
