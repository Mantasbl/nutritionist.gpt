import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { AuthOptions, CONFIG, PassportJWTOptions } from '../../config';
import { AuthService } from '../capabilities/auth-service';
import { UserRepository } from '../capabilities/user-repository';
import { IncorrectLoginDetails } from '../exceptions/incorrect-login-details';
import { JwtPayload } from '../types/auth';
import { UserValidated } from '../types/user';

export class AuthServiceImpl implements AuthService {
  constructor(
    private jwtService: JwtService,
    private users: UserRepository,
  ) {}

  async generateJwt(payload: JwtPayload): Promise<string> {
    const jwtOptions = CONFIG.PASSPORT_JWT() as PassportJWTOptions;
    return this.jwtService.sign(payload, jwtOptions);
  }

  async validateUser(email: string, password: string): Promise<UserValidated> {
    const user = await this.users.obtainUserByEmail({ email });
    const passwordHash = await this.hashPassword(password);
    if (user.password !== passwordHash) {
      throw new IncorrectLoginDetails();
    }
    return { id: user.id };
  }

  async hashPassword(password: string): Promise<string> {
    const authOptions = CONFIG.AUTH() as AuthOptions;
    return crypto
      .createHash('sha256')
      .update(password + authOptions.salt)
      .digest('base64');
  }
}
