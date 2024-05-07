import { Expose } from "class-transformer";
import { ResponseBaseDto } from "../../shared/dto-base/response-base.dto.abstract";

export class UserResponseDto extends ResponseBaseDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    name?: string;
}
