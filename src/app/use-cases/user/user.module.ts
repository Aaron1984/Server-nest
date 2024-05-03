import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/data-sources/mysql-repository/entities/user.entity';
import { UserRepository } from '@src/app/data-sources/mysql-repository/adapters/user-repository/user-repository.service';
import { FindUsersService } from './find-users/find-users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [FindUsersService],
    providers: [FindUsersService, UserRepository],
})
export class UserModule {}
