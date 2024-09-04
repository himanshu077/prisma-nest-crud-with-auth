import { IsString, IsEmail, IsOptional, MinLength} from "class-validator"

export class userCreateDto{
    @IsString()
    readonly name: string;

    @IsString()  
    @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
    readonly password: string;
  

    @IsEmail()
    readonly email:string;

}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
  
    @IsString()  
    @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
    readonly password: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;
  }