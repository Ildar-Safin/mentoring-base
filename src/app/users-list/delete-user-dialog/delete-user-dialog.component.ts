import {Component, inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {User} from "../../interfaces/user-interface";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: 'delete-user-dialog.component.html',
  styleUrl: 'delete-user-dialog.component.scss',
  imports: [MatDialogModule, MatButtonModule],
  standalone: true
})

export class DeleteUserDialogComponent {
  public readonly data = inject<{user: User}>(MAT_DIALOG_DATA)

  readonly dialog = inject(MatDialog);

}
