import { Controller, Post } from '@nestjs/common';

@Controller('game')
export class GamehController {

    constructor() { }

    @Post('/create')
    createRoom() {
        console.log('create room')
    }

    @Post('/join')
    joinRoom() {
        console.log('create room')
    }

}
