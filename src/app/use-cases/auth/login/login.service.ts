import { Injectable } from '@nestjs/common';
import { ValidateUserService } from '../validate-user/validate-user.service';
import { JwtFacadeService } from '../jwt-facade/jwt-facade.service';
import { AuthRepository } from '@mysql/adapters/auth-repository/auth-repository.service';
import { UserEntity } from '@mysql/entities/user.entity';

@Injectable()
export class LoginService {
    constructor(
        private validateUserService: ValidateUserService,
        private jwtFacadeService: JwtFacadeService,
        private authRepository: AuthRepository,
    ) {}

    async signin(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
        const user: UserEntity = await this.validateUserService.validate(email, password);
    
        const { token, refreshToken } = await this.jwtFacadeService.createJwtAndRefreshToken(user);
    
        Object.assign(user, { refreshToken }); // le asignamos lo que esta en attrs a lo que esta en user
    
        await this.authRepository.save(user as UserEntity);
    
        return { token, refreshToken };
      }
}
