import { ReturnUserDTO } from '../../user/DTO/return-user.dto';

export interface ReturnLogin {
  user: ReturnUserDTO;
  accessToken: string;
}
