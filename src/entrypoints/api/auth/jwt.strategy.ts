import { PassportStrategy } from '@nestjs/passport';
import { CONFIG, PassportJWTOptions } from 'config';
import { JwtPayload } from 'domain/types/auth';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtOptions = CONFIG.PASSPORT_JWT() as PassportJWTOptions;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
