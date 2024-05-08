/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { ApiProperty } from '@nestjs/swagger';
import { IConfirmEmailResponse } from '../interfaces/auth-signup-response.interface';

export class ConfirmationTokenResponseMapper {
  @ApiProperty({
    description: 'Confirmation token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    type: String,
  })
  public readonly confirmationToken: string;

  constructor(values: IConfirmEmailResponse) {
    Object.assign(this, values);
  }

  public static map(
    result: IConfirmEmailResponse,
  ): ConfirmationTokenResponseMapper {
    return new ConfirmationTokenResponseMapper({
      confirmationToken: result.confirmationToken,
    });
  }
}
