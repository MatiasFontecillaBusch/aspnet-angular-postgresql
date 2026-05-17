import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginParams, LoginResponse } from '../../types/authentication';
import { User } from '../../types/user';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/authentication`;
  currentUser = signal<User | null>(null);
  token = signal<string | null>(null);

  constructor() {
    this.getFromLocalStorageAndSetUser();
  }

  login(params: LoginParams) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, params).pipe(
      tap((res) => {
        if (res.user) this.setCurrentUser(res.user);
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.token.set(null);
    localStorage.removeItem('user');
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getFromLocalStorageAndSetUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      this.logout();
      return;
    }

    try {
      this.currentUser.set(JSON.parse(userString));
    } catch (e) {
      this.logout();
    }
  }
}
