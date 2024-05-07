import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigModule } from "@nestjs/config";
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MysqlRepositoryModule } from '@mysql/mysql-repository.module';
import { HttpApiModule } from './data-transports/http-api/http-api.module';

dotenv.config();

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'prod',
    }),
    // Environment
    ConfigModule.forRoot({
      envFilePath: `./src/environments/${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true
    }),
    MysqlRepositoryModule,
    HttpApiModule
  ],
})
export class AppModule {}
