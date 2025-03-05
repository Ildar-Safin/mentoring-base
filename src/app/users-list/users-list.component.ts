import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUser, User } from "../interfaces/user-interface";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { UserActions } from "./store/user.actions";
import { Store } from "@ngrx/store";
import { selectUsers, selectUsersError, selectUsersLoading } from "./store/users.selectors";
import { Observable } from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  styleUrl: './users-list.component.scss',
  imports: [NgFor, UserCardComponent, AsyncPipe, MatIconModule, MatButtonModule, NgIf,],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);
  public readonly loading$: Observable<boolean> = this.store.select(selectUsersLoading);
  public readonly error$: Observable<string | null>= this.store.select(selectUsersError);

  constructor() {
    this.store.dispatch(UserActions.load());
  }

  deleteUser(id: number) {
    this.store.dispatch(UserActions.delete({ id }));
  }

  editUser(user: User) {
  this.store.dispatch(UserActions.edit({ user }));
}

  public createUser(formData: CreateUser) {
    this.store.dispatch(
      UserActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.company.name,
          },
        },
      })
    )
  }

  @Input()
  user!: User;

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((createResult: CreateUser) => {
      if (createResult) {this.createUser(createResult);
      }
    });
  }
}
