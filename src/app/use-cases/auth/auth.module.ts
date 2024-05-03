import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginService } from './login/login.service';
import { JwtFacadeService } from './jwt-facade/jwt-facade.service';
import { ValidateUserService } from './validate-user/validate-user.service';
import { EncryptionFacadeService } from './encryption-facade/encryption-facade.service';
import { UserEntity } from '@app/data-sources/mysql-repository/entities/user.entity';
import { AuthRepository } from '@src/app/data-sources/mysql-repository/adapters/auth-repository/auth-repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // Config JWT Auth
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // secret: configService.jwtKey,
          secretOrPrivateKey: configService.getOrThrow<string>('JWT_KEY'),
          signOptions: {
            // expiresIn: '60s', lo estoy definiendo en el servicio
            // expiresIn: '7d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [LoginService, JwtFacadeService, ValidateUserService, EncryptionFacadeService],
  providers: [LoginService, JwtFacadeService, ValidateUserService, EncryptionFacadeService, AuthRepository]
})
export class AuthModule {}
