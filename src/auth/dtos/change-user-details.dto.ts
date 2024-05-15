import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export abstract class ChangeUserDetailsDto {
  @ApiProperty({
    description: 'The current name',
    minLength: 1,
    type: String,
  })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'The current lastname',
    minLength: 1,
    type: String,
  })
  @IsString()
  @IsOptional()
  public lastname?: string;

  @ApiProperty({
    description: 'The current username',
    minLength: 1,
    type: String,
  })
  @IsString()
  @IsOptional()
  public username?: string;
}
