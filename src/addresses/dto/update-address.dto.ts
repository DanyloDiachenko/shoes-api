import { IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    receiver?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    homeNumber?: string;

    @IsString()
    @IsOptional()
    postIndex?: number;
}
