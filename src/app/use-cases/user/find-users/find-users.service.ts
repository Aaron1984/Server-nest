import { Injectable } from '@nestjs/common';
import { UserRepository } from '@mysql/adapters/user-repository/user-repository.service';
import { UserEntity } from '@mysql/entities/user.entity';

@Injectable()
export class FindUsersService {
    constructor(private userRepository: UserRepository) {}

    async find(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.userRepository.find();

        return users;
    }
}
