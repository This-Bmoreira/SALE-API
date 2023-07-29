import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCity(@Param('stateId') stateId: number): Promise<CityEntity[]> {
    return this.cityService.getAllCity(stateId);
  }
}
