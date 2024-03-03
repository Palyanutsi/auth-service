import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from './users.service';

@Injectable()
export class UserCleanupService {
  constructor(private readonly userService: UsersService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleUserCleanup() {
    await this.userService.deleteUnconfirmedUsers();
  }
}
