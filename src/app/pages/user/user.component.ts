import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TalkjsChatComponent } from '../../talkjs-chat/talkjs-chat.component';
import { USERS } from '../../mock/users';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TalkjsChatComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  contactForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      lastname: [null, Validators.required],
      firstname: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  onSubmitForm(): void {
    if (this.contactForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs.";
    } else {
      this.errorMessage = '';

      const { lastname, firstname, subject, message } = this.contactForm.value;
      const mailtoLink = `mailto:${USERS[1].email}?subject=[${firstname} ${lastname}] - ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoLink;
    }
  }
}
