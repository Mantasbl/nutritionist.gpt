import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Conversation } from './conversation';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column({ type: 'text' })
  text: string;

  @Column({ default: true }) // True = User, False = AI
  sender: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(conversation: Conversation, text: string, sender: boolean) {
    this.conversation = conversation;
    this.text = text;
    this.sender = sender;
  }
}
