import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
