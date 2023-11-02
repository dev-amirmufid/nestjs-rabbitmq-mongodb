import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly birthday: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly height: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly weight: number;

  @IsArray()
  @ApiProperty()
  readonly interests: string[];
}
