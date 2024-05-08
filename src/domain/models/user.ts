import { Conversation } from './conversation';

export interface User {
  readonly id: number;

  readonly email: string;

  readonly password: string;

  readonly filledInitialSurvey?: boolean;

  readonly conversations?: Conversation[];

  readonly createdAt: Date;

  readonly updatedAt?: Date;
}
