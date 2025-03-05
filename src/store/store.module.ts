import { DynamicModule, Module } from "@nestjs/common";
import { StoreServices } from "./store.service";

export interface StoreConfig {
    dirname: string
    filename: string
}

@Module({
    providers: [
        StoreServices,
        {
            provide: 'STORE_CONFIG',
            useValue: {
                dirname: 'store',
                filename: 'data.json'
            } as StoreConfig
        }
    ],
    exports: [StoreServices]
})

export class StoreModule {
    // static register(config: StoreConfig): DynamicModule {
    //     return {
    //         module: StoreModule,
    //         providers: [
    //             StoreServices, {
    //                 provide: 'STORE_CONFIG',
    //                 useValue: config
    //             }
    //         ],
    //         exports: [StoreServices]
    //     }
    // }
}