import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private modeService = inject(ModeService);

  loginForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
    });
  }

  getCurrentMode(): 'user' | 'support' {
    return this.modeService.getMode();
  }

  toggleMode(): void {
    const newMode = this.modeService.getMode() === 'user' ? 'support' : 'user';
    this.modeService.setMode(newMode);
  }

  onSubmitForm(): void {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const currentMode = this.modeService.getMode();

    if (currentMode === 'user') {
      if (credentials.email === 'user@gmail.com' && credentials.password === 'POC.user') {
        this.router.navigate(['/user']);
      } else {
        this.errorMessage = "L'email et/ou le mot de passe est incorrect pour le mode utilisateur.";
      }
    } else {
      if (credentials.email === 'support@gmail.com' && credentials.password === 'POC.support') {
        this.router.navigate(['/support']);
      } else {
        this.errorMessage = "L'email et/ou le mot de passe est incorrect pour le mode support.";
      }
    }
  }   
}
