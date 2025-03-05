import { Expose, plainToInstance } from "class-transformer"

export abstract class BaseDto {
    @Expose()
    id: string

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date

    // excludeExtraneousValues true chỉ muốn lấy những trường @Expose()
    static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
        return plainToInstance(this, obj, { excludeExtraneousValues: true })
    }
}