import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IRefreshTokenController } from '@core/domain/ports/inbound/refresh-token-controller/refresh-token-controller.interface';
import { RefreshTokenResponseDto } from '../../dto/refresh-token/refresh-token-response-dto';
import { RefreshTokenService } from '@app/use-cases/auth/refresh-token/refresh-token.service';
import { ValidateRefTokenAndNewTokens } from '../../shared/decorators/new-refresh-token.decorator';
import { SerializeResponseDto } from '../../shared/decorators/serialize.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';

@Controller('refresh-token')
export class RefreshTokenController implements IRefreshTokenController<RefreshTokenResponseDto> {
    constructor(private refreshTokenService: RefreshTokenService) {}
  
    @Post('/')
    @ValidateRefTokenAndNewTokens()
    @HttpCode(HttpStatus.OK)
    @SerializeResponseDto(RefreshTokenResponseDto)
    async refreshToken(@CurrentUser() user): Promise<RefreshTokenResponseDto> {
      //el guard coge el token de la cabecera y al user del token y lo mete en el request
      return this.refreshTokenService.refreshTokens(user.email, user.refreshToken);
    }
  }
