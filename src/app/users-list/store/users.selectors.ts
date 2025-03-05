import { User } from "../../interfaces/user-interface";
import { createSelector } from "@ngrx/store";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersFeature,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersFeature,
  (state: UserState) => state.error
);
