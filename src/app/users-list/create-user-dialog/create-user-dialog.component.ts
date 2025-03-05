import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatError, MatFormField, MatIconModule, MatInputModule, MatLabel, MatSuffix, ReactiveFormsModule]
})

export class CreateUserDialogComponent {

  private readonly dialogRef: MatDialogRef<CreateUserDialogComponent> = inject(MatDialogRef<CreateUserDialogComponent>)

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [Validators.required, Validators.minLength(3)]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

  public submitForm(): void {
    this.dialogRef.close(this.form.value)
  }
}
