import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from './user/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  fireStore = inject(Firestore);
  userCollection = collection(this.fireStore, 'User');

  getUsers(): Observable<UserData[]> {
    return collectionData(this.userCollection, {
      idField: 'id',
    }) as Observable<UserData[]>;
  }

  addUser(user: UserData): Promise<void> {
    const userCollection = collection(this.fireStore, 'User');
    return addDoc(userCollection, user)
      .then(() => console.log('User added successfully:', user))
      .catch((error) => console.error(' Error adding user:', error));
  }

  async findUser(email: string): Promise<UserData | null> {
    const q = query(this.userCollection, where('email', '==', email));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No user found with this email.');
        return null;
      }

      const user = querySnapshot.docs[0].data() as UserData;
      console.log('User found:', user);

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
}
