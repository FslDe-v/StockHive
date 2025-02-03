import { Component, DestroyRef, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { FirestoreService } from '../../fireStore.service';
import { UserData } from '../../user/user.model';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, catchError, from, map } from 'rxjs';

function uniqueEmailValidator(firestore: Firestore): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return from([]);
    }

    const userCollection = collection(firestore, 'User');
    const q = query(userCollection, where('email', '==', control.value));

    return from(getDocs(q)).pipe(
      map((querySnapshot: { empty: any }) => {
        return querySnapshot.empty ? null : { emailTaken: true };
      }),
      catchError((error: any) => {
        console.error('❌ Error checking email uniqueness:', error);
        return from([null]);
      })
    );
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
})
export class SignUpComponent {
  constructor(private router: Router, private userService: UserService) {}
  private firestoreService = inject(FirestoreService);
  firestore = inject(Firestore);

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
      asyncValidators: [uniqueEmailValidator(this.firestore)],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  get emailAlreadyTaken() {
    return this.form.controls.email.hasError('emailTaken');
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      const formValue = this.form.value;
      const name: string = formValue.name || '';
      const email: string = formValue.email || '';
      const password: string = formValue.password || '';

      console.log(name, email, password);
      const user: UserData = {
        id: 'u' + new Date().getTime,
        name: name,
        email: email,
        password: password,
      };
      this.userService.setUser(user);
      this.firestoreService.addUser(user);
      this.userService.login();
      console.log(this.userService.isLoggedIn());
      this.router.navigate(['/home']);
    } else {
      console.error('Form is invalid.');
    }
  }
}
