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
        this.options = options;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            Object.defineProperty(this, "clientDb", {
                value: yield mongodb_1.MongoClient.connect(this.options.dbUrl || `mongodb://${this.options.user}:${this.options.password}@${this.options.host}${this.options.port}/${this.options.dbName}`, {
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                })
            });
            Object.defineProperty(this, "db", {
                value: this.db = this.clientDb.db(this.options.dbName || 'keymongo').collection(this.options.collectionName)
            });
        });
    }
    /**
     *
     * @example key_mongo.set('user_1', { money: 20 })
     */
    set(key, value) {
        if (!key || !['String', 'Number'].includes(key.constructor.name))
            throw new keyError_1.default('TypeError', 'The key must be string or number.');
        this.db.updateOne({ _id: key }, {
            $set: { _id: key, value: value }
        }, { upsert: true });
    }
    /**
     *
     * @example key_mongo.get('user_1')
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key || !['String', 'Number'].includes(key.constructor.name))
                throw new keyError_1.default('TypeError', 'The key must be string or number.');
            return yield this.db.findOne({ _id: key });
        });
    }
    /**
     *
     * @example key_mongo.delete('user_1')
     */
    delete(key) {
        if (!key || !['String', 'Number'].includes(key.constructor.name))
            throw new keyError_1.default('TypeError', 'The key must be string or number.');
        this.db.deleteOne({ _id: key });
    }
    /**
     *
     * @example key_mongo.has('user_1')
     * @returns Boolean
     */
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
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
        this.db.drop();
    }
}
exports.KeyMongo = KeyMongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5TW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvS2V5TW9uZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBQ2xDLHFDQUFrRDtBQUNsRCxNQUFNLFFBQVE7SUFDVixZQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQUksQ0FBQztJQUc5QixJQUFJOztZQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDcEMsS0FBSyxFQUFFLE1BQU0scUJBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFNLElBQUksYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUMvSyxrQkFBa0IsRUFBRSxJQUFJO29CQUN4QixlQUFlLEVBQUUsSUFBSTtpQkFDeEIsQ0FBQzthQUNMLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtnQkFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2FBQy9HLENBQUMsQ0FBQTtRQUNOLENBQUM7S0FBQTtJQUNEOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEtBQWM7UUFDM0MsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxFQUFFO1lBQzNCLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtTQUNuQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNEOzs7T0FHRztJQUVVLEdBQUcsQ0FBQyxHQUFvQjs7WUFDakMsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztZQUN0SSxPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsR0FBb0I7UUFDOUIsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsR0FBb0I7O1lBQ2pDLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGtCQUFRLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7WUFDdEksTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ2xELElBQUcsTUFBTSxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFBO2FBQ2Q7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUE7YUFDZjtRQUNMLENBQUM7S0FBQTtJQUNEOztPQUVHO0lBQ0ksS0FBSztRQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEIsQ0FBQztDQUNKO0FBQ1EsNEJBQVEifQ==