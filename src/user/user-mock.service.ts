import { UserDto } from "./user.dto";

export class UserMockService {
    createUser(user: UserDto): UserDto {
        user.id = '11'
        user.createdAt = new Date()
        user.updatedAt = new Date()
        user.username = 'username mock'
        user.password = 'password mock'

        return UserDto.plainToClass(user)
    }
}