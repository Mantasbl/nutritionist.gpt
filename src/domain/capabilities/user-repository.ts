import { User } from '../models/user';

export interface UserRepository {
  obtainUserByEmail(params: UserEmailFilterParams): Promise<User>;

  obtainUserById(id: number): Promise<User>;

  createUser(params: UserCreateParams): Promise<User>;

  updateUser(user: User): Promise<User>;
}

export interface UserCreateParams {
  readonly email: string;

  readonly password: string;

  readonly first_name?: string;

  readonly last_name?: string;

  readonly img_url?: string;
}

export interface UserIdFilterParams {
  readonly user_id: number;
}

export interface UserEmailFilterParams {
  readonly email: string;
}

export interface UserUpdateParams {}
