import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@core/domain/ports/outbound/user-repository/user.repository.interface';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, RemoveOptions, Repository, SaveOptions } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
      ) {}
    
      save(entity: UserEntity, options?: SaveOptions): Promise<UserEntity> {
        return this.repository.save(entity, options);
      }
    
      find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
        return this.repository.find(options);
      }
    
      findById(id: number): Promise<UserEntity | null> {
        return this.repository.findOneBy({ id });
      }
    
      remove(entity: UserEntity, options?: RemoveOptions): Promise<UserEntity> {
        return this.repository.remove(entity, options);
      }
}
