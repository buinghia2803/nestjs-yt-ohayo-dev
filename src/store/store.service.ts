import { Inject, Injectable } from "@nestjs/common";
// import { StoreConfig } from "./store.module";
import * as fs from 'fs';
import { STORE_CONFIG_TOKEN, StoreConfig } from "./store.config";

@Injectable()
export class StoreServices {
    constructor(@Inject(STORE_CONFIG_TOKEN) private readonly storeConfig: StoreConfig) {
        if (this.storeConfig.dirname && !fs.existsSync(this.storeConfig.dirname)) {
            fs.mkdirSync(this.storeConfig.dirname);
        }
    }
    save(data: any): void {
        console.log('store.StoreService', data);

        if (!this.storeConfig.dirname) {
            throw new Error("storeConfig.dirname is not defined");
        }

        const dirPath = this.storeConfig.dirname;
        const filePath = `${dirPath}/${this.storeConfig.filename}`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        jsonData.push(data);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    }
}