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
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    pricefilter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields', 'categories'];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (queryObj.priceRange) {
            const priceRange = queryObj.priceRange;
            switch (priceRange) {
                case "below-1000":
                    this.modelQuery = this.modelQuery.find({ price: { $lt: 1000 } });
                    break;
                case "1000-5000":
                    this.modelQuery = this.modelQuery.find({ price: { $gte: 1000, $lte: 5000 } });
                    break;
                case "5000-10000":
                    this.modelQuery = this.modelQuery.find({ price: { $gte: 5000, $lte: 10000 } });
                    break;
                case "above-10000":
                    this.modelQuery = this.modelQuery.find({ price: { $gt: 10000 } });
                    break;
                default:
                    break;
            }
        }
        else {
            this.modelQuery = this.modelQuery.find(queryObj);
        }
        return this;
    }
    categoriesfilter() {
        if (this.query.categories) {
            const categories = this.query.categories;
            this.modelQuery = this.modelQuery.find({
                category: { $in: categories },
            });
        }
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortOrder) || "asc";
        if (sort === "asc") {
            this.modelQuery = this.modelQuery.sort({ price: 1 });
        }
        else if (sort === "desc") {
            this.modelQuery = this.modelQuery.sort({ price: -1 });
        }
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 6;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 8;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
