export abstract class HttpError extends Error {
  abstract statusCode?: number;
}
