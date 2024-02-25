/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export abstract class ConfirmEmailDto {
  @ApiProperty({
    description: 'The JWT token to validate confirmation code',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    type: String,
  })
  @IsString()
  @IsJWT()
  public confirmationToken!: string;

  @ApiProperty({
    description: 'The confirmation code',
    example: '22B292',
    type: String,
  })
  @IsString()
  public confirmationCode!: string;
}
