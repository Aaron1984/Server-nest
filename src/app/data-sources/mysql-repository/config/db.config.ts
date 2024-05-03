import { join } from 'path';
import { isLocal, isTest } from '../../../../environments/constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig = (configService: ConfigService) =>{

  const path = process.cwd();
  return ({
    type: configService.getOrThrow<string>('DB_TYPE'),
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<string>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_USERNAME'),
    password: configService.getOrThrow<string>('DB_PASSWORD'),
    database: configService.getOrThrow<string>('DB_DATABASE'),
    // entities: [
    //   join(path, 'dist/src/app/data-sources/mysql-repository/entities/**.entity.js}')
    // ],
    // migrations: [join(path, 'src/app/data-sources/mysql-repository/migrations/**.migration{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: isLocal || isTest ? true : false, // esto solo es para desarrollo, para produccion usamos migraciones
    logging: false, // esto es para debugear las consultas a la base de datos
  } as TypeOrmModuleOptions);
}
  

export default typeOrmConfig;