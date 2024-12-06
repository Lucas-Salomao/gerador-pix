import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePixDTO {
  @IsString()
  @IsNotEmpty()
  merchantName: string;

  @IsString()
  @IsNotEmpty()
  merchantCity: string;

  @IsString()
  @IsNotEmpty()
  pixKey: string;

  @IsOptional()
  @IsString()
  infoAdicional?: string;

  @IsNumber()
  @IsNotEmpty()
  transactionAmount: number;
}