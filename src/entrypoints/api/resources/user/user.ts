import { ApiProperty } from '@nestjs/swagger';
import { User } from 'domain/models/user';

export class UserResource {
  @ApiProperty({ type: Number, example: 1 })
  readonly id: number;

  @ApiProperty({ type: String, example: 'email' })
  readonly email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  static from(user: User): UserResource {
    return new UserResource(user.id, user.email);
  }
}
