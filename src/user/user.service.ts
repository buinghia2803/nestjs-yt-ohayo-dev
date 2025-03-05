import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { StoreConfig } from '../store/store.config';
import { StoreService } from './store.service';
import { StoreServices } from '../store/store.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('APP_FACEBOOK') appFacebook: any,
        @Inject('STORE_CONFIG') storeConfig: StoreConfig,
        @Inject('STORE_SERVICE') private storeService: StoreService,
        private storeServices: StoreServices
    ) { 
        console.log(appFacebook);
    }

    createUser(user: UserDto): UserDto {
        this.storeService.save(user)
        user.id = '1'
        user.createdAt = new Date()
        user.updatedAt = new Date()

        this.storeServices.save(user)
        
        return UserDto.plainToClass(user)
    }
}
