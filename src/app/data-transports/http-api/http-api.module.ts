import { Module } from '@nestjs/common';
import { FindUsersController } from './adapters/find-users/find-users.controller';
import { UserModule } from '@app/use-cases/user/user.module';
import { LoginController } from './adapters/login/login.controller';
import { AuthModule } from '@app/use-cases/auth/auth.module';

@Module({
    imports: [
        UserModule,
        AuthModule
    ],
    controllers: [
        FindUsersController,
        LoginController
    ]
})
export class HttpApiModule {}
