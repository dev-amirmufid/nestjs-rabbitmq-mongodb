import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthEntity } from '@auth/entities/auth.entity';
import { isUnique } from '@utils/unique.validator';
import { EqualTo } from '@utils/equalTo.validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  @isUnique({ tableName: AuthEntity, column: 'username' })
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @isUnique({ tableName: AuthEntity, column: 'email' })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @EqualTo(RegisterDto, (s): string => s.password)
  @ApiProperty()
  readonly confirm_password: string;
}
