import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SignUpComponent {
  constructor(private router: Router, private userService: UserService) {}

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
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
      const formValue = this.form.value;
      const name: string = formValue.name || '';
      const email: string = formValue.email || '';
      const password: string = formValue.password || '';

      console.log(name, email, password);
      this.userService.setUser({
        id: 'u' + new Date().getTime,
        name: name,
        email: email,
        password: password,
      });

      this.userService.login();
      console.log(this.userService.isLoggedIn());
      this.router.navigate(['/home']);
    } else {
      console.error('Form is invalid.');
    }
  }
}
