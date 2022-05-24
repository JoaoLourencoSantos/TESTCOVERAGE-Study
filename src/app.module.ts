import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthController } from './app/controllers/health.controller';
import { CategoryModule } from './app/modules/category.module';
import { EntryModule } from './app/modules/entry.module';
import GoalModule from './app/modules/goal.module';
import UserModule from './app/modules/user.module';
import { AuthModule } from './auth/auth.module';
import * as ormOptions from './config/orm';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    AuthModule,
    UserModule,
    EntryModule,
    CategoryModule,
    GoalModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
