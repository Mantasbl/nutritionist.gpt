import { Conversation } from './conversation';

export interface Message {
  readonly id: number;

  readonly text: string;

  readonly sender: boolean;

  readonly conversation: Conversation;

  readonly createdAt: Date;
}
