import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Message } from './message';
import { User } from './user';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(user: User, messages?: Message[]) {
    this.user = user;
    this.messages = messages;
    this.createdAt = new Date();
  }
}
