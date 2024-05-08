export class MessageNotFoundError extends Error {
  constructor(message = 'Message Not Found') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
