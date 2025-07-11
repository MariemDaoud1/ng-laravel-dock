import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiURL = environment.apiUrl;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  CreateUser(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  UserRegister(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  UserLogin(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, user);
  }

  UserLogout(): void {
    this.removeToken();
    localStorage.removeItem('user'); // Optional, if you store user info
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/user`, {
      headers: this.getAuthHeaders()
      // No withCredentials here because no cookie/session auth
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
