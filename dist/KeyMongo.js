"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyMongo = void 0;
const mongodb_1 = require("mongodb");
const keyError_1 = __importDefault(require("./keyError"));
class KeyMongo {
    constructor(options) {
        Object.defineProperty(this, "options", {
            value: options,
        });
        mongodb_1.MongoClient.connect(options.dbUrl || `mongodb://${options.user}:${options.password}@${options.host}${options.port}/${options.dbName}` || "mongodb://127.0.0.1:27017").then((x) => {
            Object.defineProperty(this, "clientDb", {
                value: x,
            });
            Object.defineProperty(this, "db", {
                value: x.db(options.dbName || "keymongo"),
            });
        });
    }
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @param {unknown} value
     * @returns {any} any
     * @example key_mongo.set('database', 'user_1', { money: 20 })
     */
    set(collectionName, key, value) {
        if (!this.clientDb)
            return new keyError_1.default("connectionError", "not yet connected to mongodb server");
        if (!key || !["String", "Number"].includes(key.constructor.name))
            throw new keyError_1.default("TypeError", "The key must be string or number.");
        this.db.collection(collectionName).updateOne({
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
    get(collectionName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            if (!key || !["String", "Number"].includes(key.constructor.name))
                throw new keyError_1.default("TypeError", "The key must be string or number.");
            return this.db.collection(collectionName).findOne({ _id: key }).then((x) => (x ? x.value : null));
        });
    }
    /**
     *
     * @param {string} collectionName
     * @param {string|number} key
     * @example key_mongo.delete('database', 'user_1')
     * @returns {any|number|string} any|number|string
     */
    delete(collectionName, key) {
        if (!this.clientDb)
            return new keyError_1.default("connectionError", "not yet connected to mongodb server");
        if (!key || !["String", "Number"].includes(key.constructor.name))
            throw new keyError_1.default("TypeError", "The key must be string or number.");
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
    has(collectionName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            if (!key || !["String", "Number"].includes(key.constructor.name))
                throw new keyError_1.default("TypeError", "The key must be string or number.");
            const findDB = yield this.db.collection(collectionName).findOne({ _id: key });
            return findDB ? true : false;
        });
    }
    /**
     *
     * @param {string} collectionName
     * @example key_mongo.drop('database')
     * @returns {Promise<any>} Promise<any>
     */
    drop(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            return this.db.collection(collectionName).drop();
        });
    }
    /**
     *
     * @param {string} collectionName
     * @example key_mongo.list('database')
     * @returns {Promise<any>} Promise<any>
     */
    list(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            return yield this.db.collection(collectionName).find({}).toArray();
        });
    }
    /**
     *
     * @param {string} collectionName
     * @param {key|number} key
     * @param {string|number} insert
     * @param {unknown} value
     * @example key_mongo.updateData('database', 'user_1', 'money', 69)
     * @returns {Promise<any>} Promise<any>
     */
    updateData(collectionName, key, insert, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            if (!key || !["String", "Number"].includes(key.constructor.name))
                throw new keyError_1.default("TypeError", "The key must be string or number.");
            if (!(yield this.has(collectionName, key)))
                return this.set(collectionName, key, {
                    [insert]: value
                });
            const data = yield this.get(collectionName, key);
            data[insert] = value;
            return this.set(collectionName, key, data);
        });
    }
    /**
     *
     * @param {string} collectionName
     * @param {key|number} key
     * @param {string|number} insert
     * @example key_mongo.deleteData('database', 'user_1', 'money')
     * @returns {Promise<any>} Promise<any>
     */
    deleteData(collectionName, key, insert) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default("connectionError", "not yet connected to mongodb server");
            if (!key || !["String", "Number"].includes(key.constructor.name))
                throw new keyError_1.default("TypeError", "The key must be string or number.");
            if (!(yield this.has(collectionName, key)))
                throw new keyError_1.default("DataError", "Data not found.");
            const data = yield this.get(collectionName, key);
            delete data[insert];
            if (!Object.keys(data)[0])
                return this.delete(collectionName, key);
            return this.set(collectionName, key, data);
        });
    }
}
exports.KeyMongo = KeyMongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5TW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvS2V5TW9uZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTBDO0FBRTFDLDBEQUFrQztBQUVsQyxNQUFhLFFBQVE7SUFDbkIsWUFBbUIsT0FBbUI7UUFDcEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ3JDLEtBQUssRUFBRSxPQUFPO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gscUJBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQU0sSUFBSSxhQUFhLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLDJCQUEyQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEwsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUN0QyxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDaEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUM7YUFDMUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBSUQ7Ozs7Ozs7T0FPRztJQUNJLEdBQUcsQ0FBQyxjQUFzQixFQUFFLEdBQW9CLEVBQUUsS0FBYztRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksa0JBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUN2SSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQzFDO1lBQ0UsR0FBRyxFQUFFLEdBQUc7U0FDVCxFQUFFO1lBQ0gsSUFBSSxFQUFFO2dCQUNKLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUs7YUFDdkI7U0FDRixFQUFFO1lBQ0QsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7UUFDSCxPQUFPO1lBQ0wsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUM7SUFDSixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1UsR0FBRyxDQUFDLGNBQXNCLEVBQUUsR0FBb0I7O1lBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksa0JBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGtCQUFRLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7WUFDdkksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7S0FBQTtJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxjQUFzQixFQUFFLEdBQW9CO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxrQkFBUSxDQUFDLGlCQUFpQixFQUFFLHFDQUFxQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3ZJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNVLEdBQUcsQ0FBQyxjQUFzQixFQUFFLEdBQW9COztZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLGtCQUFRLENBQUMsaUJBQWlCLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUFFLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3ZJLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDOUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUNEOzs7OztPQUtHO0lBQ1UsSUFBSSxDQUFDLGNBQXNCOztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLGtCQUFRLENBQUMsaUJBQWlCLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUNsRyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUNEOzs7OztPQUtHO0lBQ1UsSUFBSSxDQUFDLGNBQXNCOztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLGtCQUFRLENBQUMsaUJBQWlCLEVBQUUscUNBQXFDLENBQUMsQ0FBQztZQUNsRyxPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUNEOzs7Ozs7OztPQVFHO0lBQ1UsVUFBVSxDQUFDLGNBQXNCLEVBQUUsR0FBb0IsRUFBRSxNQUF1QixFQUFFLEtBQWM7O1lBQzNHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksa0JBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGtCQUFRLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7WUFDdkksSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtvQkFDL0UsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUE7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBQ0Q7Ozs7Ozs7T0FPRztJQUNVLFVBQVUsQ0FBQyxjQUFzQixFQUFFLEdBQW9CLEVBQUUsTUFBdUI7O1lBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksa0JBQVEsQ0FBQyxpQkFBaUIsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGtCQUFRLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7WUFDdkksSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFBRSxNQUFNLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUMvRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtDQUNGO0FBeklELDRCQXlJQyJ9