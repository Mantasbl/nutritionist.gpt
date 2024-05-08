import { Conversation } from 'domain/models/conversation';
import { User } from 'domain/models/user';

export interface ConversationRepository {
  obtainConversationById(id: number): Promise<Conversation>;

  createConversation(params: ConversationCreateParams): Promise<Conversation>;
}

export interface ConversationCreateParams {
  readonly user: User;
}
