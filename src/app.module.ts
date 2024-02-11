import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
