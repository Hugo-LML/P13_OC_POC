import { Component } from '@angular/core';
import { TalkjsChatComponent } from "../../talkjs-chat/talkjs-chat.component";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [TalkjsChatComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {

}
