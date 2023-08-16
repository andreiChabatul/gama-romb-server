import { Module } from '@nestjs/common';
import { GamehController } from './game.controller';


@Module({
controllers:[GamehController]
})
export class GameModule { }
