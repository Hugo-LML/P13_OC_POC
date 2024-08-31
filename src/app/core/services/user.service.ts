import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = '../../assets/mock/users.json';

  private currentUser: User | null = null;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find((user) => user.email === email && user.password === password);
        this.currentUser = user ? user : null;
        return this.currentUser;
      })
    );
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getOtherUser(): Observable<User | null> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find((user) => user.id !== this.currentUser?.id) ?? null)
    );
  }
}