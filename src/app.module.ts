import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PostModule } from './post/post.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UserModule, PostModule, StoreModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
