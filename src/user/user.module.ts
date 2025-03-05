import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMockService } from './user-mock.service';
import { StoreConfig } from '../store/store.config';
import { StoreService } from './store.service';
import { StoreModule } from '../store/store.module';

const configFacebook = {
  appId: 'facebook001',
  appSecret: 'facebook001'
}

function createStore(config: StoreConfig): StoreService {
  console.log(config);
  
  return new StoreService()
}

@Module({
  imports: [StoreModule],
  controllers: [UserController],
  // providers: [UserService] // c1 dùng nhiều
  providers: [{
    provide: 'USER_SERVICE',
    useClass: UserService,
  }, {
    provide: 'APP_FACEBOOK',
    useValue: configFacebook
  }, {
    provide: 'STORE_CONFIG',
    useValue: {
      dir: 'store',
      path: 'user'
    } as StoreConfig
  }, {
    provide: 'STORE_SERVICE',
    useFactory: createStore,
    // muốn nhận được tham số cho hàm createStore thì phải ghi inject
    inject: [{
      token: 'STORE_CONFIG',
      optional: true
    }]
  }]
})
export class UserModule { }
