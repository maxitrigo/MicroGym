import { IsString } from "class-validator";

export class CreateGymDto {

    @IsString()
    name: string;

    @IsString()
    address: string;
    
    @IsString()
    phone: string;
    
    @IsString()
    email: string;
    
    @IsString()
    owner: string;
    
    @IsString()
    slug: string;
}
