import { UserRepository, UserEmailFilterParams, UserUpdateParams } from 'domain/capabilities/user-repository';
import { UserService } from 'domain/capabilities/user-service';
import { User } from 'domain/models/user';
import { UserCreateBody } from 'entrypoints/api/validators/user/user-create-body';

export class UserServiceImpl implements UserService {
  constructor(private users: UserRepository) {}

  async createUser(params: UserCreateBody): Promise<User> {
    return await this.users.createUser(params);
  }

  async obtainUserByEmail(params: UserEmailFilterParams): Promise<User> {
    return await this.users.obtainUserByEmail(params);
  }

  async obtainUserById(id: number): Promise<User> {
    return await this.users.obtainUserById(id);
  }

  async updateUser(user: User): Promise<User> {
    return await this.users.updateUser(user);
  }
}
