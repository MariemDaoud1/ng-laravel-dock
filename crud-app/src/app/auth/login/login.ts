import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../auth';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private AuthService: Auth, private router: Router) {}
  ngOnInit() {
  if (this.AuthService.isLoggedIn()) {
    this.router.navigate(['/post']);
  }
}

  onSubmit() {
  this.AuthService.UserLogin({ email: this.email, password: this.password }).subscribe(
    (res: any) => {
      if (res.status === 1) {
        this.AuthService.setToken(res.data.token);
        this.router.navigate(['/post']);
    } else {
      this.error = res.message || 'Login failed';
      console.error('Login error:', res.message);
}

    },
    (err) => {
      if (err.status === 401) {
        this.error = 'Email or password is incorrect.';
      } else {
        this.error = 'An unexpected error occurred.';
      }
      console.error('Login error:', err);
    }
  );
}

}