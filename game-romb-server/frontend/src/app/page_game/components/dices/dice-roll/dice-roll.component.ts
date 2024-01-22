import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TIME_TURN_DEFAULT } from 'src/app/const';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { AudioServices } from 'src/app/shared/services/audio.services';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';

@Component({
  selector: 'app-dice-roll',
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate('0.4s', style({
          opacity: 1,
        })),
      ])
    ])
  ]
})
export class DiceRollComponent implements OnInit {

  diceOne = 0;
  diceTwo = 0;
  isDouble: boolean;
  result: number | string = '...';
  @Input() cheatNumbers: number[];
  @Output() resetDice = new EventEmitter();

  constructor(private webSocketController: WebSocketController, private audioServices: AudioServices) { }

  ngOnInit(): void {
    setTimeout(() => this.roolDice(), 0);
  }

  roolDice() {
    this.result = '...'
    this.audioServices.playAudioSpec('diceRool');
    if (this.cheatNumbers.length > 1) {
      [this.diceOne, this.diceTwo] = this.cheatNumbers;
    } else {
      this.diceOne = this.randomrool(this.diceOne);
      this.diceTwo = this.randomrool(this.diceTwo);
    }
    this.resetDice.emit();
    this.diceOne === this.diceTwo ? this.isDouble = true : this.isDouble = false;

    setTimeout(() => this.result = this.diceOne + this.diceTwo, 1000)
    setTimeout(() => {
      this.webSocketController.sendMessage(EACTION_WEBSOCKET.DICE_ROLL, {
        value: this.result,
        isDouble: this.isDouble
      });
    }, TIME_TURN_DEFAULT
    );
  }

  randomrool(dice: number): number {
    const result = Math.floor((Math.random() * 6) + 1);
    if (dice === result) {
      return this.randomrool(result);
    }
    return result;
  }
}
