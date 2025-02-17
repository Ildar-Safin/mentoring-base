import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {User} from "../../interfaces/user-interface";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UpperCasePipe} from "@angular/common";
import {RedDirective} from "../../directives/red.directive";
import {ShadowDirective} from "../../directives/shadow.directive";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  imports: [MatDialogModule, MatSnackBarModule, MatCardModule, MatButtonModule, UpperCasePipe, RedDirective,
    ShadowDirective ],
  standalone: true
})

export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  public deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '600px',
      data: {user: this.user }
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined )=> {
      if (result) {
        this.deleteUser.emit(this.user.id)
        this.snackBar.open('Пользователь удален', 'Ok', {
          duration: 1500
        })
        console.log('Пользователь удален', this.user.id)
      } else
      this.snackBar.open('Отмена удаления', 'Ok', {
        duration: 1500
      })
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {user: this.user},
    });

    dialogRef.afterClosed().subscribe((editResult) => {
      console.log('Модалка закрылась, значение формы: ', editResult);
      if (editResult) { this.editUser.emit(editResult);
      }
    });
  }
}
