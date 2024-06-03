import { Module } from '@nestjs/common';
import { NutritionistChatServiceImpl } from 'domain/services/nutritionist';
import { NutritionistChatController } from 'entrypoints/api/controllers/nutritionist-controller';
import { factory } from 'framework/provider';
import { DatabaseModule } from 'infrastructure/persistence/database.module';
import { ConversationEntityManager } from 'infrastructure/persistence/repositories/conversation';
import { MessageEntityManager } from 'infrastructure/persistence/repositories/message';
import { UserEntityManager } from 'infrastructure/persistence/repositories/user';

@Module({
  imports: [DatabaseModule],
  controllers: [NutritionistChatController],
  providers: [
    factory(NutritionistChatServiceImpl, [UserEntityManager, MessageEntityManager, ConversationEntityManager]),
  ],
})
export class NutritionistChatModule {}
