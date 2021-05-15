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
const keyError_1 = __importDefault(require("./keyError"));
const mongodb_1 = require("mongodb");
class KeyMongo {
    constructor(options) {
        this.version = require('../package.json').version;
        Object.defineProperty(this, "options", {
            value: options
        });
        mongodb_1.MongoClient.connect(options.dbUrl || `mongodb://${options.user}:${options.password}@${options.host}${options.port}/${options.dbName}` || 'mongodb://127.0.0.1:27017', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(x => {
            Object.defineProperty(this, "clientDb", {
                value: x
            });
            Object.defineProperty(this, "db", {
                value: x.db(options.dbName || 'keymongo').collection(options.collectionName)
            });
        });
    }
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key, value) {
        if (!this.clientDb)
            return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
        if (!key || !['String', 'Number'].includes(key.constructor.name))
            throw new keyError_1.default('TypeError', 'The key must be string or number.');
        this.db.updateOne({ _id: key }, {
            $set: { _id: key, value: value }
        }, { upsert: true });
        return {
            _id: key,
            value: value
        };
    }
    /**
     *
     * @example key_mongo.get('user_1')
     */
    get(key) {
        if (!this.clientDb)
            return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
        if (!key || !['String', 'Number'].includes(key.constructor.name))
            throw new keyError_1.default('TypeError', 'The key must be string or number.');
        return this.db.findOne({ _id: key }).then(x => x ? x.value : null);
    }
    /**
     *
     * @example key_mongo.delete('user_1')
     */
    delete(key) {
        if (!this.clientDb)
            return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
        if (!key || !['String', 'Number'].includes(key.constructor.name))
            throw new keyError_1.default('TypeError', 'The key must be string or number.');
        this.db.deleteOne({ _id: key });
        return {
            _id: key
        };
    }
    /**
     *
     * @example key_mongo.has('user_1')
     */
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
            if (!key || !['String', 'Number'].includes(key.constructor.name))
                throw new keyError_1.default('TypeError', 'The key must be string or number.');
            const findDB = yield this.db.findOne({ _id: key });
            if (findDB) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    /**
     * @example key_mongo.clear()
     */
    clear() {
        if (!this.clientDb)
            return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
        return this.db.drop();
    }
    /**
     *
     */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientDb)
                return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
            return yield this.db.find({}).toArray();
        });
    }
}
exports.KeyMongo = KeyMongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5TW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvS2V5TW9uZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBQ2xDLHFDQUFrRDtBQUNsRCxNQUFNLFFBQVE7SUFDVixZQUFZLE9BQW1CO1FBZ0JmLFlBQU8sR0FBVyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFmaEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25DLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQTtRQUNGLHFCQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFNLElBQUksYUFBYSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSwyQkFBMkIsRUFBRTtZQUNuSyxrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dCQUM5QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQy9FLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUtGOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEtBQWM7UUFDM0MsSUFBRyxDQUFD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