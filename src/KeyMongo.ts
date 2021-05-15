import KeyError from "./keyError";
import { MongoClient, Collection } from "mongodb";
class KeyMongo {
    constructor(options: keyOptions) {
        Object.defineProperty(this, "options", {
            value: options
        })
        MongoClient.connect(options.dbUrl! || `mongodb://${options.user}:${options.password}@${options.host}${options.port}/${options.dbName}` || 'mongodb://127.0.0.1:27017', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(x =>  {
            Object.defineProperty(this, "clientDb", {
                value: x
            })
            Object.defineProperty(this, "db", {
                value: x.db(options.dbName || 'keymongo').collection(options.collectionName) 
            })
        })
     }
    public readonly version: string = require('../package.json').version
    public readonly clientDb!: MongoClient;
    public readonly db!: Collection<any>;
    
    /**
     * 
     * @example key_mongo.set('user_1', { money: 20 })
     */
    public set(key: string | number, value: unknown) {
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        this.db.updateOne({ _id: key}, {
            $set: { _id: key, value: value }
        }, { upsert: true })
        return {
            _id: key,
            value: value
        }
    }
    /**
     * 
     * @example key_mongo.get('user_1') 
     */

    public get(key: string | number) {
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        return this.db.findOne({ _id: key }).then(x => x ? x.value : null)
    }

    /**
     * 
     * @example key_mongo.delete('user_1')
     */
    public delete(key: string | number) {
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
        if(!key || !['String', 'Number'].includes(key.constructor.name)) throw new KeyError('TypeError', 'The key must be string or number.');
        this.db.deleteOne({ _id: key })
        return {
            _id: key
        }
    }

    /**
     * 
     * @example key_mongo.has('user_1')
     */
    public async has(key: string | number) {
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
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
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
        return this.db.drop()
    }
    /**
     * 
     */
    public async list() {
        if(!this.clientDb) return new KeyError('connectionError', 'not yet connected to mongodb server');
        return await this.db.find({}).toArray()
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
