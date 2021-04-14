import { keyOptions } from "./typings";
import { MongoClient, Collection } from "mongodb";
export default class KeyMongo {
    options: keyOptions;
    constructor(options: keyOptions);
    clientDb: MongoClient;
    db: Collection<any>;
    init(): Promise<void>;
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key: string | number, value: unknown): void;
    /**
     *
     * @example key_mongo.get('user_1')
     */
    get(key: string | number): Promise<any>;
    /**
     *
     * @example key_mongo.delete('user_1')
     */
    delete(key: string | number): void;
    /**
     *
     * @example key_mongo.has('user_1')
     * @returns Boolean
     */
    has(key: string | number): Promise<boolean>;
    /**
     * @example key_mongo.clear()
     */
    clear(): void;
}
