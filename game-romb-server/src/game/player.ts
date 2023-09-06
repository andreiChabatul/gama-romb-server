import { Player } from "src/types";
import { users } from "src/users/users.service";
import { CIRCLE_REWARD, MAX_INDEX_CELL_BOARD } from "./defaultBoard/defaultBoard";

export class PlayerDefault implements PlayerDefault {

    readonly player: Player;

    constructor(id: string, numberPlayer: number) {
        const playerNew = users.find(user => user.userId === id);

        this.player = {
            id: id,
            name: playerNew.nickname,
            image: 'temp',
            total: 0,
            capital: 0,
            cellPosition: 0,
            isTurn: false,
            numberPlayer: numberPlayer
        }
    }


    turnPlayer(): void {
        this.player.isTurn = true;
    }

    setPosition(value: number) {
        this.player.cellPosition = this.positioonCellCalc(value);
    }

    returnNumberPlayer(): number {
        return this.player.numberPlayer;
    }

    returnCellPosition(): number {
        return this.player.cellPosition;
    }


    returnPlayer(): Player {
        return this.player;
    }


    private positioonCellCalc(value: number): number {
        let resultPosition = this.player.cellPosition + value;
        if (resultPosition >= 38) {
            this.player.total += CIRCLE_REWARD;
            resultPosition = resultPosition - MAX_INDEX_CELL_BOARD;
        }
        return resultPosition;
    }

}