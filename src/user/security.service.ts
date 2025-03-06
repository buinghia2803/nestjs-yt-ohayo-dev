import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class SecurityService {
    constructor(@Inject('USER_SERVICE') @Inject(forwardRef(() => UserService)) private userService: UserService) { }
}