import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ILoginController } from '@core/domain/ports/inbound/login-controller/login.controller.interface';
import { LoginRequestDto } from '../../dto/login/login-request-dto';
import { LoginResponseDto } from '../../dto/login/login-response-dto';
import { LoginService } from '@app/use-cases/auth/login/login.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('login')
export class LoginController implements ILoginController<LoginRequestDto, LoginResponseDto> {
    constructor(private loginService: LoginService) {}

    @Public()
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        const { token, refreshToken } = await this.loginService.signin(body.email, body.password);
        return { token, refreshToken };
    }
}
