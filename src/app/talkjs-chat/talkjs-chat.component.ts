import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import Talk from 'talkjs';
import { USERS } from '../mock/users';
import { ModeService } from '../services/mode.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-talkjs-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './talkjs-chat.component.html',
  styleUrl: './talkjs-chat.component.scss'
})
export class TalkjsChatComponent implements OnInit, OnDestroy {
  private modeService = inject(ModeService);
  private router = inject(Router);

  currentMode!: 'user' | 'support';
  private talkSession!: Talk.Session;

  ngOnInit(): void {
    this.currentMode = this.modeService.getMode();
    this.initializeTalkJS();
  }

  getCurrentMode(): 'user' | 'support' {
    return this.modeService.getMode();
  }

  initializeTalkJS(): void {
    Talk.ready.then((): void => {
      const me = new Talk.User(this.currentMode === 'user' ? { ...USERS[0] } : { ...USERS[1] });
      this.talkSession = new Talk.Session({
        appId: 'tYnmDpU1',
        me: me,
      });

      const support = new Talk.User(this.currentMode === 'user' ? { ...USERS[1] } : { ...USERS[0] });

      const conversation = this.talkSession.getOrCreateConversation('new_conversation');
      conversation.setParticipant(me);
      conversation.setParticipant(support);
      if (this.currentMode === 'user' && this.router.url === '/user') {
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