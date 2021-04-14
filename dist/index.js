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
                value: this.db = this.clientDb.db(this.options.dbName || 'keymongo').collection(this.options.name)
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
exports.default = KeyMongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwREFBa0M7QUFDbEMscUNBQWtEO0FBQ2xELE1BQXFCLFFBQVE7SUFDekIsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtJQUFJLENBQUM7SUFHOUIsSUFBSTs7WUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQ3BDLEtBQUssRUFBRSxNQUFNLHFCQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBTSxJQUFJLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDL0ssa0JBQWtCLEVBQUUsSUFBSTtvQkFDeEIsZUFBZSxFQUFFLElBQUk7aUJBQ3hCLENBQUM7YUFDTCxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNyRyxDQUFDLENBQUE7UUFDTixDQUFDO0tBQUE7SUFDRDs7O09BR0c7SUFDSSxHQUFHLENBQUMsR0FBb0IsRUFBRSxLQUFjO1FBQzNDLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUN0SSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsRUFBRTtZQUMzQixJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7U0FDbkMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRDs7O09BR0c7SUFFVSxHQUFHLENBQUMsR0FBb0I7O1lBQ2pDLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxJQUFJLGtCQUFRLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7WUFDdEksT0FBTyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDOUMsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEdBQW9CO1FBQzlCLElBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUN0SSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsR0FBRyxDQUFDLEdBQW9COztZQUNqQyxJQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUFFLE1BQU0sSUFBSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3RJLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtZQUNsRCxJQUFHLE1BQU0sRUFBRTtnQkFDUCxPQUFPLElBQUksQ0FBQTthQUNkO2lCQUFNO2dCQUNILE9BQU8sS0FBSyxDQUFBO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7SUFDRDs7T0FFRztJQUNJLEtBQUs7UUFDUixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xCLENBQUM7Q0FDSjtBQWhFRCwyQkFnRUMifQ==