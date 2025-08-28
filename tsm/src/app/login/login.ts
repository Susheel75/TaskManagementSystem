import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showModal = false; // 👈 for modal

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const apiUrl = 'http://localhost:8083/api/auth/login';

      this.http.post(apiUrl, this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          this.isLoading = false;
          this.showModal = true; 
        },
        error: (error) => {
          console.error('Login error:', error);
          alert('Login failed. Please check your credentials.');
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onReset() {
    this.loginForm.reset();
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/dashboard']); // ✅ navigate after closing modal
  }
}
