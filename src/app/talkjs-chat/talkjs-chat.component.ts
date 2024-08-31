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
  
  private talkSession!: Talk.Session;
  currentUser: User | null = null;
  otherUser: User | null = null;
  showTalkJsContainer: boolean = false;

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.userService.getOtherUser().pipe(first()).subscribe((user) => {
      this.otherUser = user;
      this.showTalkJsContainer = this.currentUser?.name.toLowerCase() === 'support';
      this.initializeTalkJS();
    });
  }

  initializeTalkJS(): void {
    Talk.ready.then((): void => {
      const me = new Talk.User({ ...this.currentUser as User });
      this.talkSession = new Talk.Session({
        appId: 'tYnmDpU1',
        me: me,
      });

      const otherParticipant = new Talk.User({ ...this.otherUser as User });

      const conversation = this.talkSession.getOrCreateConversation('new_conversation');
      conversation.setParticipant(me);
      conversation.setParticipant(otherParticipant);

      if (this.currentUser?.name.toLowerCase() === 'user' && this.router.url === '/user') {
        const popup = this.talkSession.createPopup();
        popup.select(conversation);
        popup.mount({ show: false });
      } else {
        const inbox = this.talkSession.createInbox();
        inbox.select(conversation);
        inbox.mount(document.getElementById("talkjs-container"));
      }
    });
  }

  cleanupTalkJS(): void {
    if (this.talkSession) {
      this.talkSession.destroy();
    }
  }

  ngOnDestroy(): void {
    this.cleanupTalkJS();
  }
}