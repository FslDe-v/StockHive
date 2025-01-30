import { Injectable, signal } from '@angular/core';
import type { UserData } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<UserData | undefined>(undefined);

  setUser(user: UserData) {
    this.user.set(user);
  }
  loggedIn = signal(false);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(): void {
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
