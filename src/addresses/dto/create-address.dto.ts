import { IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    receiver: string;

    @IsString()
    phone: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    homeNumber: string;

    @IsString()
    postIndex: number;
}
