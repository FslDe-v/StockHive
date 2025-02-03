import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function matchEmailPasswordValidator(
  firestore: Firestore
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!(control instanceof FormGroup)) {
      return from([]);
    }
    const email = control.get('email')?.value;
    const password = control.get('password')?.value;

    if (!email || !password) {
      return from([]);
    }
    const userCollection = collection(firestore, 'User');
    const q = query(userCollection, where('email', '==', email));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        if (querySnapshot.empty) {
          return { invalidCredentials: true };
        }
        const user = querySnapshot.docs[0].data();
        return user['password'] === password
          ? null
          : { invalidCredentials: true };
      }),
      catchError((error) => {
        return from([null]);
      })
    );
  };
}
