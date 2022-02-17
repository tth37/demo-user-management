import { IsString } from "class-validator";

export class LoginUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class LoginUserDtoWithToken {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  token: string;
}
