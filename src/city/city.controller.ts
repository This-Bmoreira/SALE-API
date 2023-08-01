import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityEntity } from './entity/city.entity';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'Get all cities by state ID' })
  @Get('/:stateId')
  async getAllCity(@Param('stateId') stateId: number): Promise<CityEntity[]> {
    return this.cityService.getAllCity(stateId);
  }
}
