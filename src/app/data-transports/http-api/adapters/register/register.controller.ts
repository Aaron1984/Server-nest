import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IRegisterController } from '@core/domain/ports/inbound/register-controller/register-controller.interface';
import { RegisterRequestDto } from '../../dto/register/register-request-dto';
import { UserResponseDto } from '../../dto/user/user-response-dto';
import { RegisterService } from '@app/use-cases/auth/register/register.service';
import { Public } from '../../shared/decorators/public.decorator';
import { SerializeResponseDto } from '../../shared/decorators/serialize.decorator';

@Controller('register')
export class RegisterController implements IRegisterController<RegisterRequestDto, UserResponseDto> {
    constructor(private registerService: RegisterService) {}
  
    @Public()
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    @SerializeResponseDto(UserResponseDto)
    async signup(@Body() body: RegisterRequestDto): Promise<UserResponseDto> {
      const user: UserResponseDto = await this.registerService.signup(body.email, body.password);
      return user;
    }
  }
