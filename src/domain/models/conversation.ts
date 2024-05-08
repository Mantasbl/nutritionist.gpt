import { Message } from './message';
import { User } from './user';

export interface Conversation {
  readonly id: number;

  readonly user: User;

  readonly messages: Message[];

  readonly createdAt: Date;

  readonly updatedAt?: Date;
}
