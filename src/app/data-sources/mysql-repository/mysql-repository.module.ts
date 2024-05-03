import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dbConfig from './config/db.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => dbConfig.default(configService),
            inject: [ConfigService],
          }),
    ],
})
export class MysqlRepositoryModule {}
