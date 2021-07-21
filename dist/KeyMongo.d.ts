import { Db, MongoClient } from 'mongodb';
export declare class KeyMongo {
    constructor(options: keyOptions);
    readonly clientDb: MongoClient;
    readonly db: Db;
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @param {unknown} value
     * @returns {any} any
     * @example key_mongo.set('database', 'user_1', { money: 20 })
     */
    set(collectionName: string, key: string | number, value: unknown): any;
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @example key_mongo.get('database', 'user_1')
     * @returns {Promise<any>} Promise<any>
     */
    get(collectionName: string, key: string | number): Promise<any>;
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @example key_mongo.delete('database', 'user_1')
     * @returns {any|number|string} any|number|string
     */
    delete(collectionName: string, key: string | number): any | number | string;
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @example key_mongo.has('database', 'user_1')
     * @returns {Promise<any|boolean>} Promise<any|boolean>
     */
    has(collectionName: string, key: string | number): Promise<any | boolean>;
    /**
     *
     * @param {string} collectionName
     * @example key_mongo.drop('database')
     * @returns {Promise<any>} Promise<any>
     */
    drop(collectionName: string): Promise<any>;
    /**
     *
     * @param {string} collectionName
     * @example key_mongo.list('database')
     * @returns {Promise<any>} Promise<any>
     */
    list(collectionName: string): Promise<any>;
    /**
     *
     * @param {string} collectionName
     * @param {key|number} key
     * @param {string|number} insert
     * @param {unknown} value
     * @example key_mongo.deleteData('database', 'user_1', 'money', 69)
     * @returns {Promise<any>} Promise<any>
     */
    updateData(collectionName: string, key: string | number, insert: string | number, value: unknown): Promise<any>;
    /**
     *
     * @param {string} collectionName
     * @param {key|number} key
     * @param {string|number} insert
     * @example key_mongo.deleteData('database', 'user_1', 'money')
     * @returns {Promise<any>} Promise<any>
     */
    deleteData(collectionName: string, key: string | number, insert: string | number): Promise<any>;
}
export interface keyOptions {
    dbUrl?: string;
    dbName?: string;
    host?: string;
    port?: string;
    user?: string;
    password?: string;
}
