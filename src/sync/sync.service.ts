import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from '../users/entities/user.entity';
import * as process from 'node:process';

@Injectable()
export class SyncService {
  readonly BACKEND_URL = process.env.BACKEND_URL;

  constructor(private readonly httpService: HttpService) {}

  public async sync(user: UserEntity) {
    return await firstValueFrom(
      this.httpService.post(`${this.BACKEND_URL}/users/sync`, {
        id: user.id,
        username: user.username,
        email: user.email,
      }),
    );
  }
}
