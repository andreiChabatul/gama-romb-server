import { Component, Input, OnInit } from '@angular/core';
import { chatMessage, fullPlayer, playersGame } from 'src/app/types';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: chatMessage;
  @Input() players: playersGame;
  player: fullPlayer;

  ngOnInit(): void {
    this.player = this.players[String(this.message.idUser)]
  }

}
