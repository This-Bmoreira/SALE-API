import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnCep } from './DTO/return-cep.dto';
import { CorreiosService } from './correios.service';

@ApiTags('correios')
@UsePipes(ValidationPipe)
@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @ApiOperation({ summary: 'Find address by CEP (Postal Code)' })
  @Get(':cep')
  async findAddressByCep(@Param('cep') cep: string): Promise<ReturnCep> {
    return this.correiosService.findAddressByCep(cep);
  }
}
