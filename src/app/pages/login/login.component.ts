import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/User';
import { first } from 'rxjs/operators';

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

  loginForm!: FormGroup; // Reactive form to manage login fields
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({ // Initializes the form with email and password fields 
      email: [null, [Validators.required, Validators.email]], // Validates email format
      password: [null, [Validators.required]], // Validates that password is not empty
    });
  }

  onSubmitForm(): void {
    const { email, password } = this.loginForm.value; // Retrieves form values

    this.userService.login(email, password)
    .pipe(first())  // Automatically unsubscribes after the first emission
    .subscribe((user: User | null) => {
      // Checks if login is successful
      if (user) {
        this.router.navigate(user.name.toLowerCase() === 'user' ? ['/user'] : ['/support']);
      } else {
        this.errorMessage = "L'email et/ou le mot de passe est incorrect.";
      }
    });
  }   
}
