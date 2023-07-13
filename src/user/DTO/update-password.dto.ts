import { IsString } from 'class-validator';

export class UpdatePassWordDTO {
  @IsString()
  newPassWord: string;
  @IsString()
  lastPassWord: string;
}
