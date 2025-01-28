import { Component, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SignUpComponent {
  constructor(private router: Router) {}

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
      const { name, email, password } = this.form.value;
      console.log(name, email, password);

      // Navigate or handle success
      this.router.navigate(['']); // Example route
    } else {
      console.error('Form is invalid.');
    }
  }
}
