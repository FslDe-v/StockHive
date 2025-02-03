import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { matchEmailPasswordValidator } from './matchEmail.validator';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../fireStore.service';
import { UserData } from '../../user/user.model';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css',
})
export class SignInComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private firestore = inject(Firestore);
  private firestoreService = inject(FirestoreService);

  navigateToSignUp() {
    console.log(this.userService.isLoggedIn());
    this.router.navigate(['/auth/signup']);
  }

  navigateToHome() {
    console.log(this.userService.isLoggedIn());
    this.router.navigate(['/home']);
  }

  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    { asyncValidators: [matchEmailPasswordValidator(this.firestore)] }
  );

  get credentialsInvalid() {
    return this.form.hasError('invalidCredentials');
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      const formValue = this.form.value;
      const email: string = formValue.email || '';
      const password: string = formValue.password || '';

      const selectedUser: UserData | null =
        await this.firestoreService.findUser(email);
      if (selectedUser) {
        console.log('User Found:', selectedUser);
        this.userService.setUser(selectedUser);
      } else {
        console.log('No user found with this email.');
      }

      this.userService.login();
      console.log(this.userService.isLoggedIn());
      this.router.navigate(['/home']);
    } else {
      console.log('Form Submitted:', this.form.value);
      console.error('Invalid email or password.');
    }
  }
}
