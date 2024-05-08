import { Inject } from '@nestjs/common';
import { UserCreateParams, UserEmailFilterParams, UserRepository } from 'domain/capabilities/user-repository';
import { UserNotFoundError } from 'domain/exceptions/user-not-found';
import { User } from 'domain/models/user';
import { User as UserEntity } from 'infrastructure/persistence/entities/user';
import { Repository } from 'typeorm';

import { USER_REPOSITORY } from '../constants/repositories';

export class UserEntityManager implements UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {}

  async obtainUserByEmail(params: UserEmailFilterParams): Promise<User> {
    const findResult = await this.userRepository.findOne({
      where: { email: params.email },
    });

    if (!findResult) {
      throw new UserNotFoundError();
    }
    return findResult as User;
  }

  async obtainUserById(id: number): Promise<User> {
    const findResult = await this.userRepository.findOne({
      where: { id },
      relations: {
        conversations: { messages: true },
      },
    });

    if (!findResult) {
      throw new UserNotFoundError();
    }
    return findResult as User;
  }

  async createUser(params: UserCreateParams): Promise<User> {
    const saveResult = await this.userRepository.save(new UserEntity(params.email, params.password));

    const findResult = await this.userRepository.findOne({
      where: { id: saveResult.id },
    });

    return findResult as User;
  }

  async updateUser(user: User): Promise<User> {
    const result = await this.userRepository.save(user);

    return result as User;
  }
}
