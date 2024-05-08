import { Inject } from '@nestjs/common';
import { MessageCreateParams, MessageRepository } from 'domain/capabilities/message-repository';
import { MessageNotFoundError } from 'domain/exceptions/message-not-found';
import { Message } from 'domain/models/message';
import { Message as MessageEntity } from 'infrastructure/persistence/entities/message';
import { Repository } from 'typeorm';

import { MESSAGE_REPOSITORY } from '../constants/repositories';

export class MessageEntityManager implements MessageRepository {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async obtainMessageById(id: number): Promise<Message> {
    const findResult = await this.messageRepository.findOne({
      where: { id },
    });

    if (!findResult) {
      throw new MessageNotFoundError();
    }
    return findResult as Message;
  }

  async createMessage(params: MessageCreateParams): Promise<Message> {
    const saveResult = await this.messageRepository.save(
      new MessageEntity(params.conversation, params.text, params.sender),
    );

    const findResult = await this.messageRepository.findOne({
      where: { id: saveResult.id },
    });

    return findResult as Message;
  }
}
