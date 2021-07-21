import { Db, MongoClient } from 'mongodb';

import KeyError from './keyError';

export class KeyMongo {
  public constructor(options: keyOptions) {
    Object.defineProperty(this, "options", {
      value: options,
    });
    MongoClient.connect(options.dbUrl! || `mongodb://${options.user}:${options.password}@${options.host}${options.port}/${options.dbName}` || "mongodb://127.0.0.1:27017").then((x) => {
      Object.defineProperty(this, "clientDb", {
        value: x,
      });
      Object.defineProperty(this, "db", {
        value: x.db(options.dbName || "keymongo"),
      });
    });
  }
  public readonly clientDb!: MongoClient;
  public readonly db!: Db;

  /**
   * 
   * @param {string} collectionName
   * @param {string|number} key
   * @param {unknown} value 
   * @returns {any} any
   * @example key_mongo.set('database', 'user_1', { money: 20 })
   */
  public set(collectionName: string, key: string | number, value: unknown): any {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    this.db.collection(collectionName).updateOne(
      {
        _id: key
      }, {
      $set: {
        _id: key, value: value
      }
    }, {
      upsert: true
    });
    return {
      _id: key,
      value: value,
    };
  }
  /**
   *
   * @param {string} collectionName
   * @param {string|number} key
   * @example key_mongo.get('database', 'user_1')
   * @returns {Promise<any>} Promise<any>
   */
  public async get(collectionName: string, key: string | number): Promise<any> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    return this.db.collection(collectionName).findOne({ _id: key }).then((x) => (x ? x.value : null));
  }
  /**
   *
   * @param {string} collectionName
   * @param {string|number} key
   * @example key_mongo.delete('database', 'user_1')
   * @returns {any|number|string} any|number|string
   */
  public delete(collectionName: string, key: string | number): any | number | string {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    this.db.collection(collectionName).deleteOne({ _id: key });
    return { _id: key };
  }
  /**
   *
   * @param {string} collectionName
   * @param {string|number} key
   * @example key_mongo.has('database', 'user_1')
   * @returns {Promise<any|boolean>} Promise<any|boolean>
   */
  public async has(collectionName: string, key: string | number): Promise<any | boolean> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    const findDB = await this.db.collection(collectionName).findOne({ _id: key });
    return findDB ? true : false;
  }
  /**
   * 
   * @param {string} collectionName
   * @example key_mongo.drop('database')
   * @returns {Promise<any>} Promise<any>
   */
  public async drop(collectionName: string): Promise<any> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    return this.db.collection(collectionName).drop();
  }
  /**
   * 
   * @param {string} collectionName
   * @example key_mongo.list('database')
   * @returns {Promise<any>} Promise<any>
   */
  public async list(collectionName: string): Promise<any> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    return await this.db.collection(collectionName).find({}).toArray();
  }
  /**
   * 
   * @param {string} collectionName 
   * @param {key|number} key 
   * @param {string|number} insert 
   * @param {unknown} value 
   * @example key_mongo.deleteData('database', 'user_1', 'money', 69)
   * @returns {Promise<any>} Promise<any>
   */
  public async updateData(collectionName: string, key: string | number, insert: string | number, value: unknown): Promise<any> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    if (!(await this.has(collectionName, key))) return this.set(collectionName, key, {
      [insert]: value
    })
    const data = await this.get(collectionName, key);
    data[insert] = value;
    return this.set(collectionName, key, data);
  }
  /**
   * 
   * @param {string} collectionName
   * @param {key|number} key
   * @param {string|number} insert
   * @example key_mongo.updateData('database', 'user_1', 'money')
   * @returns {Promise<any>} Promise<any>
   */
  public async deleteData(collectionName: string, key: string | number, insert: string | number): Promise<any> {
    if (!this.clientDb) return new KeyError("connectionError", "not yet connected to mongodb server");
    if (!key || !["String", "Number"].includes(key.constructor.name)) throw new KeyError("TypeError", "The key must be string or number.");
    if (!(await this.has(collectionName, key))) throw new KeyError("DataError", "Data not found.");
    const data = await this.get(collectionName, key);
    delete data[insert];
    if (!Object.keys(data)[0]) return this.delete(collectionName, key);
    return this.set(collectionName, key, data);
  }
}

export interface keyOptions {
  dbUrl?: string;
  dbName?: string;
  host?: string;
  port?: string;
  user?: string;
  password?: string;
}
