import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatInputComponent {

  chatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private webSocketController: WebSocketController
  ) {
    this.createForm();
  }

  private createForm() {
    this.chatForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {

    if (this.chatForm.invalid) {
      this.chatForm.markAllAsTouched();
      return;
    }
    this.webSocketController.sendMessage(
      EACTION_WEBSOCKET.UPDATE_CHAT,
      {
        message: this.chatForm.get('message')?.value
      }
    )
    this.chatForm.get('message')?.reset();
  } 

}
