import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@Controller('seeds')
@ApiTags('Seeds')
export class SeedsController {
  constructor(private seedsService: SeedsService) {}
  @Get('/run-seed')
  async runSeeds(): Promise<void> {
    await this.seedsService.saveUserTest();
  }
}
