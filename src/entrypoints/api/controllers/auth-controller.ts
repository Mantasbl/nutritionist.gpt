import { Body, Controller, HttpStatus, Inject, Post, UseFilters, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'domain/capabilities/auth-service';
import { UserService } from 'domain/capabilities/user-service';
import { IncorrectLoginDetails } from 'domain/exceptions/incorrect-login-details';
import { UserNotFoundError } from 'domain/exceptions/user-not-found';
import { AuthServiceImpl } from 'domain/services/auth';
import { UserServiceImpl } from 'domain/services/user';
import { JWT } from 'domain/types/auth';

import { ApiErrorFilter } from '../exceptions/filters/api-error-filter';
import { ErrorStatus } from '../exceptions/transform/error-status';
import { ApiValidationPipe } from '../pipes/api-validation-pipe';
import { JwtResource } from '../resources/jwt';
import { UserResource } from '../resources/user/user';
import { AuthFilterQuery } from '../validators/auth/auth-filter-query';
import { UserCreateBody } from '../validators/user/user-create-body';

@ApiTags('Auth')
@Controller()
@UsePipes(ApiValidationPipe)
@UseFilters(ApiErrorFilter)
export class AuthController {
  constructor(
    @Inject(AuthServiceImpl) private authService: AuthService,
    @Inject(UserServiceImpl) private userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'Generate JWT token from email and password',
    description:
      'Returns access_token that contains email and user id. Valid for 12hours default, unless otherwise changed by env',
  })
  @ApiResponse({ status: HttpStatus.OK, type: JwtResource })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(IncorrectLoginDetails, HttpStatus.NOT_FOUND)
  @Post('/v1/login')
  async generateAuthJWT(@Body() query: AuthFilterQuery): Promise<JWT> {
    const validatedUser = await this.authService.validateUser(query.email, query.password);
    const jwt = await this.authService.generateJwt({
      email: query.email,
      id: validatedUser.id,
    });
    return { access_token: jwt };
  }

  @ApiOperation({
    summary: 'Register new user',
    description: 'Returns newly registered user',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserResource })
  @Post('/v1/users')
  async registerUser(@Body() body: UserCreateBody): Promise<UserResource> {
    const passwordHash = await this.authService.hashPassword(body.password);
    const newUser = await this.userService.createUser({ ...body, password: passwordHash });
    return UserResource.from(newUser);
  }
}
