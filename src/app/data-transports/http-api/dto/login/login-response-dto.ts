import { Expose } from "class-transformer";
import { ResponseBaseDto } from "../../shared/dto-base/response-base.dto.abstract";

export class LoginResponseDto extends ResponseBaseDto{
    @Expose()
    token: string;

    @Expose()
    refreshToken: string;
}
