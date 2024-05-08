import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCreateBody {
  @ApiProperty({ type: String, example: 'test.user@gmail.com' })
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String, example: 'password123' })
  @IsString()
  readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
