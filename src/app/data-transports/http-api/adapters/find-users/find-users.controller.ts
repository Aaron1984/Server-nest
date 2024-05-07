import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IFindUsersController } from '@core/domain/ports/inbound/find-users-controller/find-users.controller.interface';
import { UserResponseDto } from '../../dto/user/user-response-dto';
import { FindUsersService } from '@app/use-cases/user/find-users/find-users.service';
import { SerializeResponseDto } from '../../shared/decorators/serialize.decorator';

@Controller('users')
export class FindUsersController implements IFindUsersController<string, UserResponseDto> {
    constructor(private findUsersService: FindUsersService) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    @SerializeResponseDto(UserResponseDto)
    async find(): Promise<UserResponseDto[]> {
      return this.findUsersService.find();
    }
}
