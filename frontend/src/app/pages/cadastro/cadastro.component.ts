import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required , Validators.email ]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const { email, password } = this.signupForm.value;

    this.authService.signup(email, password).subscribe({
      next: () => {
        this.router.navigate(['/products']); // redireciona para products
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erro ao cadastrar';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
