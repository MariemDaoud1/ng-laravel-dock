import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { Router, RouterModule } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirm_password = '';

  serverErrors: string[] = [];
  formTouched = false;

  constructor(private authService: Auth,private router:Router,private http:HttpClient) {}

  onSubmit(form: any) {
    this.formTouched = true;
    this.serverErrors = [];

    if (form.valid && this.password === this.confirm_password) {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        error: ''
      };

      this.authService.UserRegister(userData).subscribe({
        next: (res: any) => {
          alert(res.message || 'Registration successful!');
          form.resetForm();
          this.formTouched = false;
          this.router.navigate(['']); // Navigate to login page after successful registration
        },
        error: (err) => {
          if (err.error?.errors) {
            this.serverErrors = [];
            for (const field in err.error.errors) {
              if (err.error.errors.hasOwnProperty(field)) {
                err.error.errors[field].forEach((msg: string) => {
                  this.serverErrors.push(`${field}: ${msg}`);
                });
              }
            }
          } else if (err.error?.message) {
            this.serverErrors = [err.error.message];
          } else {
            this.serverErrors = ['An unexpected error occurred.'];
          }
        }
      });
    } else if (this.password !== this.confirm_password) {
      this.serverErrors.push("Password and confirm password must match.");
    }
  }
}
