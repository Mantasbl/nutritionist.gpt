import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorHttpStatusCode, HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HttpError } from 'domain/types/error';
import { Response } from 'express';

type ErrorResponse = { statusCode: number; message: string | string[]; error: string };

type ErrorWithMetaData = Error & { meta?: object | object[] };

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  catch(exception: HttpError, host: ArgumentsHost): void {
    const metadata = (exception as ErrorWithMetaData).meta;
    const httpException = ApiErrorFilter.getHttpError(exception);
    const errorResponse = httpException.getResponse() as ErrorResponse;

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(errorResponse.statusCode)
      .json({
        error: {
          name: exception.constructor.name,
          message: errorResponse.error ?? errorResponse.message,
          status: errorResponse.statusCode,
          faults: Array.isArray(errorResponse.message) ? errorResponse.message : [errorResponse.message],
        },
        ...(metadata && errorResponse.statusCode !== HttpStatus.INTERNAL_SERVER_ERROR && { meta: metadata }),
      });
  }

  static STATUS_CODE_META_DATA = 'ApiErrorFilter:StatusCode';

  private static getHttpError(exception: HttpError): HttpException {
    if (exception instanceof HttpException) {
      return exception;
    }

    if (exception.statusCode !== undefined) {
      const statusCode: ErrorHttpStatusCode = exception.statusCode as ErrorHttpStatusCode;

      // Make sure statusCode is in HttpErrorByCode
      if (statusCode in HttpErrorByCode) {
        return new HttpErrorByCode[statusCode](exception.message) as HttpException;
      }
    }

    const error = new InternalServerErrorException(exception.message);
    error.stack = exception.stack;

    return error;
  }
}
