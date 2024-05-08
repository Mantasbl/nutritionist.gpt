import { Message } from 'domain/models/message';
import { Conversation } from 'infrastructure/persistence/entities/conversation';

export interface MessageRepository {
  obtainMessageById(id: number): Promise<Message>;

  createMessage(params: MessageCreateParams): Promise<Message>;
}

export interface MessageCreateParams {
  readonly conversation: Conversation;

  readonly text: string;

  readonly sender: boolean;
}
