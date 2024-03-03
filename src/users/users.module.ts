/*
  Free and Open Source - GNU LGPLv3
  Copyright © 2023
  Afonso Barracha
*/

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OAuthProviderEntity } from './entities/oauth-provider.entity';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserCleanupService } from './users-cleanup.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, OAuthProviderEntity])],
  providers: [UsersService, UserCleanupService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
