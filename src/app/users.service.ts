import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsersService {
  private currentUser: { username: string, isAdmin: boolean } | null = null;

  constructor() { }

  loginAsAdmin() {
    this.currentUser = {
      username: 'admin',
      isAdmin: true
    };
  }

  loginAsUser() {
    this.currentUser = {
      username: 'user',
      isAdmin: false
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.isAdmin ?? false;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  logout() {
    this.currentUser = null;
  }
}
