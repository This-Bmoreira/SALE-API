import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class CorreiosService {
  urlCorreios = process.env.URL_CEP_CORREIO;
  constructor(private readonly httpService: HttpService) {}

  async findAddressByCep(cep: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
      .get(this.urlCorreios.replace('{CEP}', cep))
      .then((result) => {
        console.log(result.data);
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found');
        }
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(`Error in connection request ${error}`);
        return error;
      });
  }
}
