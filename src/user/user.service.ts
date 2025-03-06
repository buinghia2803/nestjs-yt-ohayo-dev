import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { StoreConfig } from '../store/store.config';
import { StoreService } from './store.service';
import { StoreServices } from '../store/store.service';
import { SecurityService } from './security.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('APP_FACEBOOK') appFacebook: any,
        @Inject('STORE_CONFIG') storeConfig: StoreConfig,
        @Inject('STORE_SERVICEuser.json') private storeServices: StoreServices,
        // private storeService: StoreService
        @Inject(forwardRef(() => SecurityService)) private readonly securityService: SecurityService
    ) { 
        console.log(appFacebook);
    }

    createUser(user: UserDto): UserDto {
        // this.storeService.save(user)
        user.id = '1'
        user.createdAt = new Date()
        user.updatedAt = new Date()

        this.storeServices.save(user)
        
        return UserDto.plainToClass(user)
    }
}
