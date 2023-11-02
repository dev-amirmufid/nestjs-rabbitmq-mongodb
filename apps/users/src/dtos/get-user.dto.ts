import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: '653fc1062b55880b46e5d7de',
    description: 'id',
  })
  _id: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'Full name',
  })
  name: string;

  @ApiProperty({
    example: '1996-01-01',
    description: 'Birthday',
  })
  birthday: string;

  @ApiProperty({
    example: 20,
    description: 'Age',
  })
  age: number;

  @ApiProperty({ example: 165, description: 'height' })
  height: number;

  @ApiProperty({ example: 46, description: 'weight' })
  weight: number;

  @ApiProperty({
    example: 'Leo',
    description: 'Horoscope',
  })
  horoscope: string;

  @ApiProperty({
    example: 'Rat',
    description: 'Zodiac',
  })
  zodiac: string;

  @ApiProperty({
    example: ['Music', 'Basket'],
    description: 'interests',
  })
  interests: string[];

  @ApiProperty({
    example: '2023-10-30T14:43:18.679Z',
    description: 'createdAt',
  })
  createdAt: string;

  @ApiProperty({
    example: '2023-10-30T14:43:18.679Z',
    description: 'updatedAt',
  })
  updatedAt: string;
}
