export class ConversationNotFoundError extends Error {
  constructor(message = 'Conversation Not Found') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
