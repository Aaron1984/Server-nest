import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@mysql/adapters/auth-repository/auth-repository.service';

@Injectable()
export class JwtFacadeService {
    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private authRepository: AuthRepository,
    ) {}

    async verifyToken(token: string) {
        try {
            await this.jwtService.verifyAsync(token, { secret: this.configService.getOrThrow<string>('JWT_KEY') });
            return true;
        } catch (error) {
            throw new ForbiddenException('Access Denied');
        }
    }

    async createJwtAndRefreshToken(user) {
        const token = await this.createJwt(user, '7d');

        const refreshToken = await this.createJwt(user, '30d');

        return { token, refreshToken };
    }

    async createJwt(user: any, expiresIn: string): Promise<string> {
        const payload = { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin };

        return await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('JWT_KEY'),
            expiresIn,
        });
    }
}
