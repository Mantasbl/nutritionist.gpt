import { ApiProperty } from '@nestjs/swagger';

export type HealthStatus = 'UP';

export class HealthCheckResource {
  @ApiProperty({ example: 'UP', description: 'API health status' })
  status: HealthStatus;

  constructor(status: HealthStatus) {
    this.status = status;
  }
}
