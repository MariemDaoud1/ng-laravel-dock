import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiURL ="http://localhost:8000/api";
  private tokenkey='auth_token';

  constructor(private http: HttpClient) {}

  getAuthHeaders() {
  return {
    Authorization: `Bearer ${this.getToken()}`
  };
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

  UserLogout() {
  this.removeToken(); // Correctly removes 'auth_token'
  localStorage.removeItem('user'); // Optional
}

  getUser(): Observable<any> {
  return this.http.get(`${this.apiURL}/user`, {
    headers: {
      Authorization: `Bearer ${this.getToken()}`
    }
  });
}

  getToken(): string | null {
    return localStorage.getItem(this.tokenkey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenkey, token);}

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenkey);
  }

}