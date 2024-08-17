import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ required: false })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(6)
  @ApiProperty({ required: true })
  phone: number;
}
