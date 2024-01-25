import { ChatI, chatMessage, messagesChat } from 'src/types/chat';
import { EACTION_WEBSOCKET } from 'src/types/websocket';
import { storage_WS } from '../socketStorage';

class Chat implements ChatI {
  readonly messagesChat: messagesChat = {};

  addChatMessage(idRoom: string, chatMessage: chatMessage): void {
    const chatGame = this.messagesChat[idRoom];
    chatGame
      ? chatGame.push(chatMessage)
      : (this.messagesChat[idRoom] = [chatMessage]);
    this.updateChat(idRoom);
  }

  getAllMessages(idRoom: string): chatMessage[] {
    return this.messagesChat[idRoom] ? this.messagesChat[idRoom] : [];
  }

  private updateChat(idRoom: string): void {
    storage_WS.sendAllPlayersGame(idRoom, EACTION_WEBSOCKET.UPDATE_CHAT, {
      chat: this.messagesChat[idRoom].at(-1),
    });
  }
}

export const chatGame = new Chat();
