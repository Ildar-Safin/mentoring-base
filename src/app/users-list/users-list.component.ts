import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {AsyncPipe, NgFor} from "@angular/common";
import {UsersApiService} from "../users-api.service";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "../users.service";
import {CreateUser, User} from "../interfaces/user-interface";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  styleUrl: './users-list.component.scss',
  imports: [NgFor, UserCardComponent, AsyncPipe, MatIconModule, MatButtonModule,],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly userApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  constructor() {
    this.userApiService.getUsers().subscribe(
      (response: User[]) => {
        this.usersService.setUsers(response);
      });

    this.usersService.users$.subscribe((users) => console.log(users));
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(user: User) {
  this.usersService.editUser(user);
}

  public createUser(formData: CreateUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.company.name,
      },
    });
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
