import {
  CONVERSATION_REPOSITORY,
  MESSAGE_REPOSITORY,
  USER_REPOSITORY,
} from 'infrastructure/persistence/constants/repositories';
import { Conversation } from 'infrastructure/persistence/entities/conversation';
import { Message } from 'infrastructure/persistence/entities/message';
import { User } from 'infrastructure/persistence/entities/user';
import { DataSource } from 'typeorm';

function createRepositoryProvider(entity: any, name: string): any {
  return {
    provide: name,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: ['DATA_SOURCE'],
  };
}

export const repositoryProviders = [
  createRepositoryProvider(User, USER_REPOSITORY),
  createRepositoryProvider(Conversation, CONVERSATION_REPOSITORY),
  createRepositoryProvider(Message, MESSAGE_REPOSITORY),
];
