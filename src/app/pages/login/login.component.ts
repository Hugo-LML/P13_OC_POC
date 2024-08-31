import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/User';

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
  private userService = inject(UserService);

  loginForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
    });
  }

  onSubmitForm(): void {
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(user.name.toLowerCase() === 'user' ? ['/user'] : ['/support']);
      } else {
        this.errorMessage = "L'email et/ou le mot de passe est incorrect.";
      }
    });
  }   
}
