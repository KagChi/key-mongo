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
        setInterval(() => {
            Object.defineProperty(this, 'state', {
                value: this.db && this.clientDb ? 'CONNECTED' : 'NOT_CONNECTED'
            });
        }, 2000);
    }
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key, value) {
        if (this.state !== 'CONNECTED')
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
        if (this.state !== 'CONNECTED')
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
        if (this.state !== 'CONNECTED')
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
     * @returns Boolean
     */
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state !== 'CONNECTED')
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
        if (this.state !== 'CONNECTED')
            return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
        this.db.drop();
    }
    /**
     *
     * @returns any[]
     */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state !== 'CONNECTED')
                return new keyError_1.default('connectionError', 'not yet connected to mongodb server');
            return yield this.db.find({}).toArray();
        });
    }
}
exports.KeyMongo = KeyMongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5TW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvS2V5TW9uZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBQ2xDLHFDQUFrRDtBQUNsRCxNQUFNLFFBQVE7SUFDVixZQUFZLE9BQW1CO1FBcUJmLFlBQU8sR0FBVyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFwQmhFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNuQyxLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUE7UUFDRixxQkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBTSxJQUFJLGFBQWEsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksMkJBQTJCLEVBQUU7WUFDbkssa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixlQUFlLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUNwQyxLQUFLLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDOUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUMvRSxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVB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