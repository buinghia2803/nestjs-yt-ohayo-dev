import { Inject, Injectable } from "@nestjs/common";
import { StoreServices } from "../store/store.service";

@Injectable()
export class PostService {
    constructor(@Inject('STORE_SERVICEpost.json') private storeServices: StoreServices) { }
    createPost(post: any): void {
        this.storeServices.save(post)
    }
}