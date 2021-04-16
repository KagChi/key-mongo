import { MongoClient, Collection } from "mongodb";
declare class KeyMongo {
    options: keyOptions;
    constructor(options: keyOptions);
    clientDb: MongoClient;
    db: Collection<any>;
    state: string;
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key: string | number, value: unknown): {
        _id: string | number;
        value: unknown;
    };
    /**
     *
     * @example key_mongo.get('user_1')
     */
    get(key: string | number): Promise<any>;
    /**
     *
     * @example key_mongo.delete('user_1')
     */
    delete(key: string | number): {
        _id: string | number;
    };
    /**
     *
     * @example key_mongo.has('user_1')
     * @returns Boolean
     */
    has(key: string | number): Promise<boolean>;
    /**
     * @example key_mongo.clear()
     */
    clear(): null | undefined;
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
