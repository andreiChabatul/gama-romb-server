import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('YANDEX_APP_ID'),
      clientSecret: configService.get('YANDEX_APP_SECRET'),
      callbackURL: 'https://api.game-monopoly.ru/yandexAuth',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, photos } = profile;
    const user = {
      nickname: name.firstName,
      image: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
