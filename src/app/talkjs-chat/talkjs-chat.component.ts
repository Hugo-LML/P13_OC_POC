import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import Talk from 'talkjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/User';
import { first } from 'rxjs';

@Component({
  selector: 'app-talkjs-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './talkjs-chat.component.html',
  styleUrl: './talkjs-chat.component.scss'
})
export class TalkjsChatComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  
  private talkSession!: Talk.Session; // Holds the TalkJS session instance
  currentUser: User | null = null;
  otherUser: User | null = null;
  showTalkJsContainer: boolean = false;

  ngOnInit(): void {
    // Fetch the current user from the service
    this.currentUser = this.userService.getCurrentUser();

    // Fetch the other user and initialize TalkJS chat when data is available
    this.userService.getOtherUser().pipe(first()).subscribe((user) => {
      this.otherUser = user;
      this.showTalkJsContainer = this.currentUser?.name.toLowerCase() === 'support'; // Show container if current user is support
      this.initializeTalkJS(); // Initialize TalkJS
    });
  }

  initializeTalkJS(): void {
    Talk.ready.then((): void => { // Wait for TalkJS SDK to be ready
      const me = new Talk.User({ ...this.currentUser as User }); // Create TalkJS User instance for the current user
      this.talkSession = new Talk.Session({ // Set up the TalkJS session
        appId: 'tYnmDpU1',
        me: me,
      });

      const otherParticipant = new Talk.User({ ...this.otherUser as User }); // Create TalkJS User instance for the other participant

      const conversation = this.talkSession.getOrCreateConversation('new_conversation'); // Create or get an existing conversation
      conversation.setParticipant(me); // Add current user as a participant
      conversation.setParticipant(otherParticipant); // Add other user as a participant

      // Determine if chat should be displayed as a popup or an inbox based on user role
      if (this.currentUser?.name.toLowerCase() === 'user' && this.router.url === '/user') {
        const popup = this.talkSession.createPopup(); // Create a popup for the conversation
        popup.select(conversation);
        popup.mount({ show: false }); // Hide the popup initially
      } else {
        const inbox = this.talkSession.createInbox(); // Create an inbox for the conversation
        inbox.select(conversation);
        inbox.mount(document.getElementById("talkjs-container")); // Mount the inbox in the DOM
      }
    });
  }

  cleanupTalkJS(): void {
    if (this.talkSession) {
      this.talkSession.destroy(); // Destroy the TalkJS session
    }
  }

  ngOnDestroy(): void {
    this.cleanupTalkJS(); // Cleanup TalkJS session when the component is destroyed
  }
}