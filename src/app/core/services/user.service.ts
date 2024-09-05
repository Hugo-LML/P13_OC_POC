import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);  // Inject HttpClient for making HTTP requests

  private usersUrl = '../../assets/mock/users.json'; // URL to the users JSON file

  private currentUser: User | null = null; // Stores the currently logged-in user

  // Fetches the list of users from the mock JSON file
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }

  // Logs in a user based on the provided email and password
  login(email: string, password: string): Observable<User | null> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find((user) => user.email === email && user.password === password);
        this.currentUser = user ? user : null;
        return this.currentUser;
      })
    );
  }

  // Returns the currently logged-in user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Fetches the other user (the user who is not the current user)
  getOtherUser(): Observable<User | null> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find((user) => user.id !== this.currentUser?.id) ?? null)
    );
  }
}