import { DynamicModule, Module } from "@nestjs/common";
import { StoreServices } from "./store.service";
import { STORE_CONFIG_TOKEN, StoreConfig, StoreFeatureConfig, StoreRootConfig } from "./store.config";

// export interface StoreConfig {
//     dirname: string
//     filename: string
// }

let rootStoreConfig: StoreConfig

const DEFAULT_STORE_DIRNAME = 'store'
const DEFAULT_FILE_NAME = 'data.json'

@Module({
    providers: [StoreServices],
    exports: [StoreServices]
})
class RootStoreModule { }

@Module({
    // providers: [
    //     StoreServices,
    //     {
    //         provide: 'STORE_CONFIG',
    //         useValue: {
    //             dirname: 'store',
    //             filename: 'data.json'
    //         } as StoreConfig
    //     }
    // ],
    // exports: [StoreServices]
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

    static forRoot(config?: StoreRootConfig): DynamicModule {
        rootStoreConfig = StoreModule.createConfig(config)
        return {
            module: RootStoreModule,
            providers: [
                {
                    provide: STORE_CONFIG_TOKEN,
                    useValue: rootStoreConfig
                }
            ],
        }
    }

    static forFeature(config: StoreFeatureConfig): DynamicModule {
        const token = 'STORE_SERVICE' + config.filename
        return {
            module: StoreModule,
            providers: [
                {
                    provide: token,
                    useFactory: () => {
                        const featureStoreConfig = StoreModule.createConfig({ ...rootStoreConfig, ...config })
                        return new StoreServices(featureStoreConfig)
                    }
                }
            ],
            exports: [token]
        }
    }

    private static createConfig(config?: StoreConfig): StoreConfig {
        const defaultConfig: StoreConfig = {
            dirname: DEFAULT_STORE_DIRNAME,
            filename: DEFAULT_FILE_NAME
        }

        return { ...defaultConfig, ...config }
    }
}