import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { gameRoom } from 'src/app/types/state';

@Component({
  selector: 'app-chat-game',
  templateUrl: './chat-game.component.html',
  styleUrls: ['./chat-game.component.scss']
})
export class ChatGameComponent implements OnChanges {

  @Input() gameRoom: gameRoom;
  @ViewChild('messageBlock') messageBlock: ElementRef;
  scrolltop: number;

  ngOnChanges(): void {
    if (this.messageBlock) this.scrolltop = this.messageBlock.nativeElement.scrollHeight;
  }

}
