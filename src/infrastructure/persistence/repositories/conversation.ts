import { Inject } from '@nestjs/common';
import { ConversationCreateParams, ConversationRepository } from 'domain/capabilities/conversation-repository';
import { ConversationNotFoundError } from 'domain/exceptions/conversation-not-found';
import { Conversation } from 'domain/models/conversation';
import { Conversation as ConversationEntity } from 'infrastructure/persistence/entities/conversation';
import { Repository } from 'typeorm';

import { CONVERSATION_REPOSITORY } from '../constants/repositories';

export class ConversationEntityManager implements ConversationRepository {
  constructor(
    @Inject(CONVERSATION_REPOSITORY)
    private ConversationRepository: Repository<ConversationEntity>,
  ) {}

  async obtainConversationById(id: number): Promise<Conversation> {
    const findResult = await this.ConversationRepository.findOne({
      where: { id },
    });

    if (!findResult) {
      throw new ConversationNotFoundError();
    }
    return findResult as Conversation;
  }

  async createConversation(params: ConversationCreateParams): Promise<Conversation> {
    const saveResult = await this.ConversationRepository.save(new ConversationEntity(params.user));

    const findResult = await this.ConversationRepository.findOne({
      where: { id: saveResult.id },
    });

    return findResult as Conversation;
  }
}
