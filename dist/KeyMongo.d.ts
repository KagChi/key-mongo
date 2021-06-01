import KeyError from "./keyError";
import { MongoClient, Db } from "mongodb";
declare class KeyMongo {
    constructor(options: keyOptions);
    readonly version: string;
    readonly clientDb: MongoClient;
    readonly db: Db;
    /**
     *
     * @example key_mongo.set('collection', 'user_1', { money: 20 })
     */
    set(collectionName: string, key: string | number, value: unknown): KeyError | {
        _id: string | number;
        value: unknown;
    };
    /**
     *
     * @example key_mongo.get('collection', 'user_1')
     */
    get(collectionName: string, key: string | number): KeyError | Promise<any>;
    /**
     *
     * @example key_mongo.delete('collection', 'user_1')
     */
    delete(collectionName: string, key: string | number): KeyError | {
        _id: string | number;
    };
    /**
     *
     * @example key_mongo.has('collection', 'user_1')
     */
    has(collectionName: string, key: string | number): Promise<boolean | KeyError>;
    /**
     * @example key_mongo.clear('collection')
     */
    clear(collectionName: string): KeyError | Promise<any>;
    /**
     * @example key_mongo.list('collection')
     */
    list(collectionName: string): Promise<any[] | KeyError>;
}
export { KeyMongo };
export interface keyOptions {
    dbUrl?: string;
    dbName?: string;
    host?: string;
    port?: string;
    user?: string;
    password?: string;
}
