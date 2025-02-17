import {Component, inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {User} from "../../interfaces/user-interface";
import {MatTooltipModule, TooltipPosition} from "@angular/material/tooltip";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormField, MatIconModule, MatDialogClose,
  MatTooltipModule],
})
export class EditUserDialogComponent {
  readonly data= inject<{ user: User }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
    website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
    company: new FormGroup({
      name: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(2)])
    })
  });

  get userWithUpdatedFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

}
