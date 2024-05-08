import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'domain/capabilities/user-service';
import { UserNotFoundError } from 'domain/exceptions/user-not-found';
import { UserServiceImpl } from 'domain/services/user';
import { UserType } from 'domain/types/user';
import { User } from '../decorators/user';
import { ApiErrorFilter } from '../exceptions/filters/api-error-filter';
import { ErrorStatus } from '../exceptions/transform/error-status';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { ApiValidationPipe } from '../pipes/api-validation-pipe';
import { UserResource } from '../resources/user/user';
import { ApiError } from '../utils/api-error';

@ApiTags('User')
@ApiBearerAuth()
@ApiError({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
@Controller()
@UsePipes(ApiValidationPipe)
@UseFilters(ApiErrorFilter)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@Inject(UserServiceImpl) private userService: UserService) {}

  @ApiOperation({
    summary: 'Get current, logged in user',
    description: 'Returns user',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserResource })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @Get('/v1/users')
  async obtainAuthedUser(@User() user: UserType): Promise<UserResource> {
    console.log(user);
    const obtainedUser = await this.userService.obtainUserByEmail({ email: user.email });
    return UserResource.from(obtainedUser);
  }
}
