import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css',
})
export class SignInComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  navigateToSignUp() {
    console.log(this.userService.isLoggedIn());
    this.router.navigate(['/auth/signup']);
  }

  navigateToHome() {
    console.log(this.userService.isLoggedIn());
    this.router.navigate(['/home']);
  }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      const { email, password } = this.form.value;
      this.userService.login();
      console.log(this.userService.isLoggedIn());
      this.router.navigate(['/home']);
    } else {
      console.error('Form is invalid.');
    }
  }
}
