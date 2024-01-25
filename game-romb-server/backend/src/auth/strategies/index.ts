import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { YandexStrategy } from './yandex.strategy';

export const STRATIGIES = [JwtStrategy, GoogleStrategy, YandexStrategy];
