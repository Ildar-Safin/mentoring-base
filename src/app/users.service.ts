import {Injectable} from "@angular/core";
import {User} from "./interfaces/user-interface";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class UsersService {
 private usersSubject$ = new BehaviorSubject<User[]>([]);
 users$ = this.usersSubject$.asObservable();

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  editUser(editedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user) =>
        user.id === editedUser.id ? editedUser : user));
  }

  createUser(user: User) {
    const existingUser = this.usersSubject$.value.find(
      currentElement => currentElement.email === user.email
    );

    existingUser !== undefined
      ? alert('Такой Email уже зарегистрирован!')
      : (this.usersSubject$.next([...this.usersSubject$.value, user]), alert('Пользователь успешно добавлен!'));
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => item.id !== id)
        )}

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
