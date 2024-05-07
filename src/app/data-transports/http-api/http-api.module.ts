import { Module } from '@nestjs/common';
import { FindUsersController } from './adapters/find-users/find-users.controller';
import { UserModule } from '@app/use-cases/user/user.module';
import { LoginController } from './adapters/login/login.controller';
import { AuthModule } from '@app/use-cases/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';

@Module({
    imports: [
        UserModule,
        AuthModule
    ],
    providers: [
        {
            provide: APP_GUARD, // Proteger la app con JWT, por defautl debes estar autenticado para acceder a cualquier ruta
            useClass: JwtAuthGuard,
        },
    ],
    controllers: [
        FindUsersController,
        LoginController
    ]
})
export class HttpApiModule {}
