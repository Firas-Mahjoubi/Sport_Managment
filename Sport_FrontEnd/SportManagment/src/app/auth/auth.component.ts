import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;
  isResetPassword = false;
  isResetToken = false;
  message = "";
  messageColor = 'yellow';

  authForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,private router: Router) { 
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['']
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Check for reset token in URL
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.isResetPassword = true;
        this.isResetToken = true;
        this.resetForm.addControl('token', this.fb.control(params['token']));
      }
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.isResetPassword = false;
    this.message = "";
  }

  toggleResetPassword(isForgot: boolean) {
    this.isResetPassword = isForgot;
    this.isResetToken = false;
    this.message = "";
  }

  onSubmit() {
    const url = this.isLogin
      ? "http://localhost:8088/api/auth/login"
      : "http://localhost:8088/api/auth/register";
  
    this.http.post(url, this.authForm.value).subscribe({
      next: (response: any) => {
        this.message = response.message;
        this.messageColor = 'green';
        
        if (response.userId) {
          // Store userId in localStorage after login or registration
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("userRole", response.role);  // Save role in localStorage
  
          // Redirect based on user role
          this.redirectToRole(response.role);
        }
      },
      error: (err) => {
        this.message = err.error?.message || "An error occurred.";
        this.messageColor = 'red';
      }
    });
  }
  
  
  redirectToRole(role: string) {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['dashboard']);
        break;
      case 'PLAYER':
        this.router.navigate(['/player-dashboard']);
        break;
      case 'COACH':
        this.router.navigate(['exercise-list']);
        break;
      case 'MEDICIN':
        this.router.navigate(['/medic-dashboard']);
        break;
      default:
        this.router.navigate(['/home']); // Default route
    }
  }
  onForgotPassword() {
    const email = this.forgotPasswordForm.controls['email'].value;
    if (!email) {
      this.message = "Please enter your email!";
      this.messageColor = 'red';
      return;
    }
    this.http.post("http://localhost:8088/api/auth/forgot-password", { email }).subscribe({
      next: (response: any) => {
        console.log("API Response:", response);  // 🔍 Debugging Purpose
        if (response && response.message) {
          this.message = response.message;
          this.messageColor = 'green';
        } else {
          this.message = "Reset link sent! Check your email.";
          this.messageColor = 'green';
        }
      },
      error: (err) => {
        console.log("API Error:", err);  // 🔍 Debugging Purpose
        this.message = err.error?.message || "Failed to send reset link!";
        this.messageColor = 'red';
      }
    });
  }



  onResetPassword() {
    this.http.post("http://localhost:8088/api/auth/reset-password", this.resetForm.value).subscribe({
      next: (response: any) => {
        console.log("Response received:", response); // Debugging
        if (response && response.message) {
          this.message = response.message;
          this.messageColor = 'green';

          // Redirect back to login after successful reset
          setTimeout(() => this.toggleResetPassword(false), 2000);
        } else {
          this.message = "Unexpected response. Try again.";
          this.messageColor = 'red';
        }
      },
      error: (err) => {
        console.error("Error occurred:", err); // Debugging
        this.message = err.error?.message || "Error resetting password!";
        this.messageColor = 'red';
      }
    });
  }
  logout() {
    localStorage.removeItem("userRole");
    this.router.navigate(['/']);
  }
  
  
}
