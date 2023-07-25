import { Controller, Get, Param } from '@nestjs/common';
import { ReturnCep } from './DTO/return-cep.dto';
import { CorreiosService } from './correios.service';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {
    this;
  }

  @Get(':cep')
  async findAddressByCep(@Param('cep') cep: string): Promise<ReturnCep> {
    return this.correiosService.findAddressByCep(cep);
  }
}
