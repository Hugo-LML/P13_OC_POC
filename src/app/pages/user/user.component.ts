import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TalkjsChatComponent } from '../../talkjs-chat/talkjs-chat.component';
import { UserService } from '../../core/services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TalkjsChatComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

  contactForm!: FormGroup; // Reactive form to manage contact fields
  errorMessage: string = '';
  supportMail: string = '';

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({ // Initializes the form with these four fields
      lastname: [null, Validators.required],
      firstname: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
    // Fetch the support's mail and assign it to supportMail (automatically unsubscribes after the first emission)
    this.userService.getUsers().pipe(first()).subscribe((users) => {
      this.supportMail = users.find((user) => user.name.toLowerCase() === 'support')?.email ?? '';
    });
  }

  onSubmitForm(): void {
    if (this.contactForm.invalid) { // Check if form is invalid and set an error message
      this.errorMessage = "Veuillez remplir tous les champs.";
    } else {
      this.errorMessage = ''; // Clear any previous error messages

      const { lastname, firstname, subject, message } = this.contactForm.value;
      // Create a mailto link to open the user's default email client
      const mailtoLink = `mailto:${this.supportMail}?subject=[${firstname} ${lastname}] - ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoLink; // Redirect to the mailto link to send the email
    }
  }
}
