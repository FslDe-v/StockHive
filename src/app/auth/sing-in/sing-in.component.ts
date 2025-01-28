import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css',
})
export class SingInComponent {
  constructor(private router: Router) {}
  navigateToSignUp() {
    this.router.navigate(['/auth/signup']); // Navigate to sign-up page
  }
  navigateToHome() {
    this.router.navigate(['']);
  }

  private destroyRef = inject(DestroyRef);

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
      console.log(email, password);

      // Navigate or handle success
      this.router.navigate(['']); // Example route
    } else {
      console.error('Form is invalid.');
    }
  }
}
