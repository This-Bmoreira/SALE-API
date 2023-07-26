import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Client } from 'nestjs-soap';
import { CityService } from '../city/city.service';
import { CityEntity } from '../city/entity/city.entity';
import { ResponsePriceCorreios } from '../order-product/DTO/response-price-correios';
import { ReturnCepExternal } from './DTO/return-cep-external.dto';
import { ReturnCep } from './DTO/return-cep.dto';
import { SizeProductDTO } from './DTO/size-product.dto';
import { CdFormatEnum } from './enum/cd-format.enum';

@Injectable()
export class CorreiosService {
  CEP_COMPANY = process.env.CEP_COMPANY;
  urlCorreios = process.env.URL_CEP_CORREIO;
  constructor(
    @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ReturnCep> {
    const returnCep: ReturnCepExternal = await this.httpService.axiosRef
      .get<ReturnCepExternal>(this.urlCorreios.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          `Error in connection request ${error.message}`,
        );
      });

    const city: CityEntity | undefined = await this.cityService
      .findCityByName(returnCep.localidade, returnCep.uf)
      .catch(() => undefined);

    return new ReturnCep(returnCep, city?.id, city?.state?.id);
  }
  async priceDelivery(
    cdService: string,
    cep: string,
    sizeProduct: SizeProductDTO,
  ): Promise<ResponsePriceCorreios> {
    return new Promise((resolve, rejects) => {
      this.soapClient.CalcPrecoPrazo(
        {
          nCdServico: cdService,
          sCepOrigem: this.CEP_COMPANY,
          sCepDestino: cep,
          nCdFormato: CdFormatEnum.BOX,
          nVlPeso: sizeProduct.weight,
          nVlComprimento: sizeProduct.length,
          nVlAltura: sizeProduct.height,
          nVlLargura: sizeProduct.width,
          nVlDiametro: sizeProduct.diameter,
          nCdEmpresa: '',
          sDsSenha: '',
          sCdMaoPropria: 'N',
          nVlValorDeclarado:
            sizeProduct.productValue < 25 ? 0 : sizeProduct.productValue,
          sCdAvisoRecebimento: 'N',
        },
        (_, res: ResponsePriceCorreios) => {
          if (res) {
            resolve(res);
          } else {
            throw new BadRequestException('Error SOAP ');
          }
        },
      );
    });
  }
}
