import { Module } from '@nestjs/common';
import { databaseProviders } from 'framework/providers/database';
import { repositoryProviders } from 'framework/providers/repository';

import { ConversationEntityManager } from './repositories/conversation';
import { MessageEntityManager } from './repositories/message';
import { UserEntityManager } from './repositories/user';

@Module({
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    UserEntityManager,
    ConversationEntityManager,
    MessageEntityManager,
  ],
  exports: [
    ...databaseProviders,
    ...repositoryProviders,
    UserEntityManager,
    ConversationEntityManager,
    MessageEntityManager,
  ],
})
export class DatabaseModule {}
