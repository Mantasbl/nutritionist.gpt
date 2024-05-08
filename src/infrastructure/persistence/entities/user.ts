import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Conversation } from './conversation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  filledInitialSurvey?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations?: Conversation[];

  constructor(email: string, password: string, conversations?: Conversation[], filledInitialSurvey?: boolean) {
    this.email = email;
    this.password = password;
    this.conversations = conversations;
    this.filledInitialSurvey = filledInitialSurvey;
    this.createdAt = new Date();
  }
}
