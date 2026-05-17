import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private route = inject(ActivatedRoute);
  protected dataForm: FormGroup;
  protected validationErrors = signal<string[]>([]);

  constructor() {
    this.dataForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const loginDto = {
      ...this.dataForm.value,
    };
    this.authenticationService.login(loginDto).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.validationErrors.set(error);
      },
    });
  }
}
