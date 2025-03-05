import { Expose, Transform } from "class-transformer"
import { IsNotEmpty } from "class-validator"
import { BaseDto } from "../common/base.dto"

export class UserDto extends BaseDto {
    @IsNotEmpty()
    @Expose() // muốn đưa ra bên ngoài
    username: string

    @IsNotEmpty()
    @Expose()
    password: string

    firstName: string
    lastName: string

    @Expose()
    @Transform(({obj}) => obj.firstName + ' ' + obj.lastName)
    fullName: string
}