/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown> & { categories?: string[] };

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
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
        else if (this.query.categories) {
            const categories = (this.query.categories as any).split(',');
            this.modelQuery = this.modelQuery.find({
                category: { $in: categories },
            });
        } else {
            this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        }


        return this;
    }

    sort() {
        const sort = this?.query?.sortOrder || 'asc';

        if (sort === "asc") {
            console.log('hitting asc', sort);
            this.modelQuery = this.modelQuery.sort({ price: 1 });
        } else if (sort === "desc") {
            console.log('hitting desc', sort);
            this.modelQuery = this.modelQuery.sort({ price: -1 });
        } else {
            console.log('hittng default', sort);
            this.modelQuery = this.modelQuery.sort(sort as string);
        }
        return this;
    }

    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    fields() {
        const fields =
            (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }

}

export default QueryBuilder;
