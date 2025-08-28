import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showModal = false; // 

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const apiUrl = 'http://localhost:8083/api/auth/signup';

      this.http.post(apiUrl, this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.isLoading = false;
          this.signupForm.reset();

          //  Show modal
          this.showModal = true;
        },
        error: (error) => {
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
          this.isLoading = false;
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/login']); //  navigate to login after closing
  }
}
