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
import { User } from 'entrypoints/api/decorators/user';
import { ApiErrorFilter } from 'entrypoints/api/exceptions/filters/api-error-filter';
import { ErrorStatus } from 'entrypoints/api/exceptions/transform/error-status';
import { JwtAuthGuard } from 'entrypoints/api/guards/jwt-auth-guard';
import { ApiValidationPipe } from 'entrypoints/api/pipes/api-validation-pipe';
import { UserResource } from 'entrypoints/api/resources/user/user';
import { ApiError } from 'entrypoints/api/utils/api-error';

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
    const obtainedUser = await this.userService.obtainUserByEmail({ email: user.email });
    return UserResource.from(obtainedUser);
  }
}
