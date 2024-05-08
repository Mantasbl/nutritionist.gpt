import { User } from '../models/user';
import { UserCreateParams, UserEmailFilterParams } from './user-repository';

export interface UserService {
  createUser(params: UserCreateParams): Promise<User>;

  obtainUserByEmail(params: UserEmailFilterParams): Promise<User>;

  obtainUserById(id: number): Promise<User>;

  updateUser(user: User): Promise<User>;
}
