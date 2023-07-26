import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CityModule } from '../city/city.module';
import { CorreiosController } from './correios.controller';
import { CorreiosService } from './correios.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  providers: [CorreiosService],
  controllers: [CorreiosController],
})
export class CorreiosModule {}