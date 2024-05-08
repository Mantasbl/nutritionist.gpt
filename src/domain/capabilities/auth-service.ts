import { JwtPayload } from '../types/auth';
import { UserValidated } from '../types/user';

export interface AuthService {
  generateJwt(payload: JwtPayload): Promise<string>;

  validateUser(email: string, password: string): Promise<UserValidated>;

  hashPassword(password: string): Promise<string>;
}
