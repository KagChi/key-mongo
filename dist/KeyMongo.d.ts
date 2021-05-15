import KeyError from "./keyError";
import { MongoClient, Collection } from "mongodb";
declare class KeyMongo {
    constructor(options: keyOptions);
    readonly version: string;
    readonly clientDb: MongoClient;
    readonly db: Collection<any>;
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key: string | number, value: unknown): KeyError | {
        _id: string | number;
        value: unknown;
    };
    /**
     *
     * @example key_mongo.get('user_1')
     */
    get(key: string | number): KeyError | Promise<any>;
    /**
     *
     * @example key_mongo.delete('user_1')
     */
    delete(key: string | number): KeyError | {
        _id: string | number;
    };
    /**
     *
     * @example key_mongo.has('user_1')
     */
    has(key: string | number): Promise<boolean | KeyError>;
    /**
     * @example key_mongo.clear()
     */
    clear(): KeyError | Promise<any>;
    /**
     *
     */
    list(): Promise<any[] | KeyError>;
}
export { KeyMongo };
export interface keyOptions {
    dbUrl?: string;
    dbName?: string;
    host?: string;
    port?: string;
    user?: string;
    password?: string;
    collectionName: string;
}
