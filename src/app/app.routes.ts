import { Routes } from '@angular/router';
import { UsersListComponent } from "./users-list/users-list.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TodosListComponent } from "./todo-list/todos-list.component";
import { AdminComponent } from "./admin/admin-component";
import { adminGuard } from "./guards/admin.guard";
import { AuthorizationDialogComponent } from "./users-list/authorization-dailog/authorization-dialog.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'login',
    component: AuthorizationDialogComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'todos',
    component: TodosListComponent,
  }
];
