import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class LookupProductDto {
  @ApiProperty({
    example: 'Nike',
    description: 'Brand name of the product',
  })
  @IsString()
  brand!: string;

  @ApiProperty({
    example: 25,
    description: 'Selected length value',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  length!: number;

  @ApiProperty({
    example: 6,
    description: 'Selected width value',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  width!: number;
}
