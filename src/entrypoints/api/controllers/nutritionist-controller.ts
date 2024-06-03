import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NutritionistChatService } from 'domain/capabilities/nutritionist-chat-service';
import { NutritionistChatServiceImpl } from 'domain/services/nutritionist';
import { UserType } from 'domain/types/user';

import { User } from '../decorators/user';
import { ApiErrorFilter } from '../exceptions/filters/api-error-filter';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { ApiValidationPipe } from '../pipes/api-validation-pipe';
import { ApiError } from '../utils/api-error';
import { UserQuery } from '../validators/user-query';

@UseGuards(JwtAuthGuard)
@ApiTags('Nutritionist')
@ApiBearerAuth()
@ApiError({ status: HttpStatus.UNAUTHORIZED, type: UnauthorizedException })
@Controller()
@UsePipes(ApiValidationPipe)
@UseFilters(ApiErrorFilter)
@UseGuards(JwtAuthGuard)
export class NutritionistChatController {
  constructor(@Inject(NutritionistChatServiceImpl) private nutritionistChatService: NutritionistChatService) {}

  @Post('chat')
  async chat(@User() user: UserType, @Body() input: UserQuery): Promise<any> {
    return await this.nutritionistChatService.chat(input.query, user.id);
  }
}
