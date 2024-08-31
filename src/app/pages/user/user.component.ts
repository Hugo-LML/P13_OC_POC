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

  contactForm!: FormGroup;
  errorMessage: string = '';
  supportMail: string = '';

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      lastname: [null, Validators.required],
      firstname: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
    this.userService.getUsers().pipe(first()).subscribe((users) => {
      this.supportMail = users.find((user) => user.name.toLowerCase() === 'support')?.email ?? '';
    });
  }

  onSubmitForm(): void {
    if (this.contactForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs.";
    } else {
      this.errorMessage = '';

      const { lastname, firstname, subject, message } = this.contactForm.value;
      const mailtoLink = `mailto:${this.supportMail}?subject=[${firstname} ${lastname}] - ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoLink;
    }
  }
}
