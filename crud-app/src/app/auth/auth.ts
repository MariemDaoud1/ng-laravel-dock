import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiURL ="http://localhost:8000/api";

  constructor(private http: HttpClient) {}

  UserRegister(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  UserLogin(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, user);
  }

  UserLogout(): Observable<any> {
    return this.http.post(`${this.apiURL}/logout`, {});
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiURL}/user`);
  }


}