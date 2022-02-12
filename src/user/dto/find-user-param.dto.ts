import { IsNumber, IsOptional, Min } from "class-validator";

export class FindUserParamDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  id?: number;
}
