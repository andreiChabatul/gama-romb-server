import { ChatMessage } from "src/types";

export class Chat {

    message: ChatMessage[];



    returnAllMessage() {
        return this.message;
    }

}