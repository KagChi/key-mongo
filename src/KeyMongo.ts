import KeyError from "./keyError";
import { MongoClient, Collection } from "mongodb";
class KeyMongo {
    constructor(public options: keyOptions) { }
    public clientDb!: MongoClient;
    public db!: Collection<any>
    public async init() {
        Object.defineProperty(this, "clientDb", {
            value: await MongoClient.connect(this.options.dbUrl! || `mongodb://${this.options.user}:${this.options.password}@${this.options.host}${this.options.port}/${this.options.dbName}`, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
        })
        Object.defineProperty(this, "db", {
            value: this.db = this.clientDb.db(this.options.dbName || 'keymongo').collection(this.options.collectionName) 
        })
    }
    /**
     * 
     * @example key_mongo.set('user_1', { money: 20 })
     */
    public set(key: string | number, value: unknown) {
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        this.db.updateOne({ _id: key}, {
            $set: { _id: key, value: value }
        }, { upsert: true })
    }
    /**
     * 
     * @example key_mongo.get('user_1') 
     */

    public async get(key: string | number) {
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        return await this.db.findOne({ _id: key })
    }

    /**
     * 
     * @example key_mongo.delete('user_1')
     */
    public delete(key: string | number) {
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        this.db.deleteOne({ _id: key })
    }

    /**
     * 
     * @example key_mongo.has('user_1')
     * @returns Boolean
     */
    public async has(key: string | number) {
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        const findDB = await this.db.findOne({ _id: key })
        if(findDB) {
            return true
        } else {
            return false
        }
    }
    /**
     * @example key_mongo.clear()
     */
    public clear() {
        this.db.drop()
    }
}
export { KeyMongo }

export interface keyOptions {
    dbUrl?: string,
    dbName?: string
    host?: string,
    port?: string
    user?: string,
    password?: string,
    collectionName: string
}