import { Injectable, OnInit, inject, signal } from '@angular/core';
import type { UserData } from './user.model';
import { FirestoreService } from '../fireStore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  fireStoreService = inject(FirestoreService);
  user = signal<UserData | undefined>(undefined);
  users = signal<UserData[] | undefined>(undefined);

  constructor() {
    this.fireStoreService.getUsers().subscribe((users) => {
      this.users.set([...users]);
      console.log('📃 Users fetched:', this.users());
    });
  }

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
