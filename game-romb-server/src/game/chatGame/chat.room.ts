import { ChatMessage, CompanyInfo, Player, chatMessage, chatMessageKey, language } from "src/types";
import { CHAT_MESSAGE } from "./chat.message";

export class Chat {

    private messages: ChatMessage[] = [];
    language: language = 'en';

    addMessage(message: string, player?: Player) {
        this.messages.push(
            {
                message,
                name: player?.name,
                numberPlayer: player?.numberPlayer
            });
    }

    addInfoMessage(message: chatMessageKey, company?: CompanyInfo): void {
        this.messages.push(
            {
                message: company
                    ? this.changeString(CHAT_MESSAGE[this.language][message], company)
                    : CHAT_MESSAGE[this.language][message]
            }
        )
    }

    getAllMessage() {
        return this.messages;
    }


    private changeString(initalMessage: string, company?: CompanyInfo): string {
        return initalMessage
            .replaceAll('COMPANY', company.nameCompany.toUpperCase())
            .replaceAll('PRICE', String(company.priceCompany));
    }

}