import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtFacadeService } from '../jwt-facade/jwt-facade.service';
import { AuthRepository } from '@app/data-sources/mysql-repository/adapters/auth-repository/auth-repository.service';

@Injectable()
export class RefreshTokenService {
    constructor(private jwtFacadeService: JwtFacadeService, private authRepository: AuthRepository) {}

    async refreshTokens(email: string, refreshToken: string) {
        const user = await this.authRepository.findByEmail(email);

        if (!user && !user.refreshToken) throw new ForbiddenException('Access Denied');

        await this.jwtFacadeService.verifyToken(refreshToken);

        const refreshTokenMatches = refreshToken === user.refreshToken;
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const { token, refreshToken: newRefreshToken } = await this.jwtFacadeService.createJwtAndRefreshToken(user);

        Object.assign(user, { refreshToken: newRefreshToken });

        await this.authRepository.save(user);

        return { token, refreshToken: newRefreshToken };
    }
}
