import { BadRequestException, Injectable } from '@nestjs/common';
import { EncryptionFacadeService } from '../encryption-facade/encryption-facade.service';
import { AuthRepository } from '@src/app/data-sources/mysql-repository/adapters/auth-repository/auth-repository.service';
import { UserEntity } from '@src/app/data-sources/mysql-repository/entities/user.entity';

@Injectable()
export class RegisterService {
    constructor(
        private encryptionFacadeService: EncryptionFacadeService,
        private authRepository: AuthRepository,
    ) {}

    async signup(email: string, password: string): Promise<UserEntity> {
        // Validar que no exista un usuario con el email repetido
        const ifUserExist: UserEntity = await this.authRepository.findByEmail(email);
    
        if (ifUserExist) {
          throw new BadRequestException('Email in use!');
        }
    
        const encryptedPassword = await this.encryptionFacadeService.hash(password);
    
        const userDao: UserEntity = this.authRepository.create({ email: email, password: encryptedPassword } as UserEntity);
    
        return this.authRepository.save(userDao);
    }
}
