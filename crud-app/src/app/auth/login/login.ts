import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    this.authService.UserLogin({ email: this.email, password: this.password }).subscribe({
      next: res => {
        // this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.error = 'Login failed. Please check your credentials.';
      }
    });
  }
}