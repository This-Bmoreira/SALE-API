import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'ID do endereço para entrega do pedido',
    example: 1,
  })
  @IsNumber()
  addressId: number;

  @ApiProperty({
    description: 'Quantidade de pagamentos (opcional)',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @ApiProperty({
    description: 'Código Pix (opcional)',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  codePix?: string;

  @ApiProperty({
    description: 'Data de pagamento (opcional)',
    example: '2023-07-30',
  })
  @IsOptional()
  @IsString()
  datePayment?: string;
}
