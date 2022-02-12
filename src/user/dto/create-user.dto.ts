import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
