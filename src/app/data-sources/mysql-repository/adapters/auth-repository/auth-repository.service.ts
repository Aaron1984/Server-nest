import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@core/domain/ports/outbound/auth-repository/auth-repository.interface';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SaveOptions } from 'typeorm';

@Injectable()
export class AuthRepository implements IAuthRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
      ) {}
    
      create(data: UserEntity): UserEntity {
        return this.repository.create(data);
      }
    
      findByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOneBy({ email });
      }
    
      save(entity: UserEntity, options?: SaveOptions): Promise<UserEntity> {
        return this.repository.save(entity, options);
      }
}
