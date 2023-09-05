import { Player } from "src/types";

export class PlayerDefault {

    player: Player;

    constructor(id: string, numberPlayer: number) {
        this.player = {
            id: id,
            name: 'temp',
            image: 'temp',
            total: 0,
            capital: 0,
            isTurn: false,
            numberPlayer: numberPlayer
        }
    }


    returnPlayer (){
        return this.player;
    }

}