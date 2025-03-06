export interface StoreConfigOld {
    dir: string
    path: string
}

export interface StoreRootConfig {
    dirname: string
}

export interface StoreFeatureConfig {
    filename: string
}

// Partial có cũng được, không có cũng được
export type StoreConfig = Partial<StoreRootConfig & StoreFeatureConfig>


export const STORE_CONFIG_TOKEN = 'STORE_CONFIG'