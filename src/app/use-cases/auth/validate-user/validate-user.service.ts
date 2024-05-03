import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionFacadeService } from '../encryption-facade/encryption-facade.service';
import { AuthRepository } from '@mysql/adapters/auth-repository/auth-repository.service';
import { UserEntity } from '@mysql/entities/user.entity';

@Injectable()
export class ValidateUserService {
    constructor(
        private encryptionFacadeService: EncryptionFacadeService, 
        private authRepository: AuthRepository
    ) {}

  async validate(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // if (!(await this.encryptionFacadeService.compare(password, user.password))) {
    //   throw new UnauthorizedException('Invalid email or password');
    // }

    return user;
  }
}
