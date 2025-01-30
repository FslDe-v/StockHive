import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  navigateToAuth() {
    this.router.navigate(['/auth/signup']);
  }
  private userService = inject(UserService);

  isLoggedIn(): boolean {
    return this.userService.loggedIn();
  }

  logout(): void {
    this.userService.loggedIn.set(false);
    this.router.navigate(['']);
  }
}
