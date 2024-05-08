import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthCheckResource } from './resource';

@ApiTags('API Health Check')
@Controller()
export class HealthCheckController {
  @ApiOperation({
    operationId: 'HealthCheck',
    summary: 'Service liveliness check',
    description: 'Returns successful response when service is available',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HealthCheckResource,
    description: 'Success.',
  })
  @Get('/_health')
  async getHealthCheck(): Promise<HealthCheckResource> {
    return new HealthCheckResource('UP');
  }
}
