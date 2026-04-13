import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Login berhasil:', res);

          // 🔐 simpan token
          localStorage.setItem('token', res.token);

          // 🚀 redirect ke dashboard
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Login gagal:', err);
          alert('Login gagal! Periksa email dan password Anda.');
        }
      });
    }
  }
}