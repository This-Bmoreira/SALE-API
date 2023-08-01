import { ApiProperty } from '@nestjs/swagger';
import { ReturnCepExternal } from './return-cep-external.dto';

export class ReturnCep {
  @ApiProperty({
    description: 'CEP',
    example: '02046-050',
  })
  cep: string;

  @ApiProperty({
    description: 'Nome da rua ou logradouro',
    example: 'Avenida Paulo Silva Araújo',
  })
  publicPlace: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: '',
  })
  complement: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Jardim São Paulo(Zona Norte)',
  })
  neighborhood: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'UF',
    example: 'SP',
  })
  uf: string;

  @ApiProperty({
    description: 'DDD da cidade',
    example: '11',
  })
  ddd: string;

  @ApiProperty({
    description: 'ID da cidade',
    example: 5270,
  })
  cityId?: number;

  @ApiProperty({
    description: 'ID do estado',
    example: 26,
  })
  stateId?: number;

  constructor(returnCep: ReturnCepExternal, cityId?: number, stateId?: number) {
    this.cep = returnCep.cep;
    this.publicPlace = returnCep.logradouro;
    this.complement = returnCep.complemento;
    this.neighborhood = returnCep.bairro;
    this.city = returnCep.localidade;
    this.uf = returnCep.uf;
    this.ddd = returnCep.ddd;
    this.cityId = cityId;
    this.stateId = stateId;
  }
}
