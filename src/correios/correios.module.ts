import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SoapModule } from 'nestjs-soap';
import { CityModule } from '../city/city.module';
import { CorreiosController } from './correios.controller';
import { CorreiosService } from './correios.service';

@Module({
  imports: [
    SoapModule.register({
      clientName: 'SOAP_CORREIOS',
      uri: 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  controllers: [CorreiosController],
  providers: [CorreiosService],
  exports: [CorreiosService],
})
export class CorreiosModule {}
