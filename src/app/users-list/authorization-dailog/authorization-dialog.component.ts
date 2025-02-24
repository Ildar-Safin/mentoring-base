import {Component} from "@angular/core";
import {UsersService} from "../../users.service";
import {MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-authorization-dialog',
  templateUrl: './authorization-dialog.component.html',
  styleUrl: './authorization-dialog.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatDialogTitle, MatDialogContent]
})

export class AuthorizationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthorizationDialogComponent>,
    public userService: UsersService) {}

  loginAsAdmin() {
    this.userService.loginAsAdmin();
    this.dialogRef.close();
  }

  loginAsUser() {
    this.userService.loginAsUser();
    this.dialogRef.close();
    console.log('User logged in:', this.userService.getCurrentUser());
  }

}
