import products, { IProduct } from "../models/products"

export interface ProductFilter {
    name?: string;
    limit?: string;
    page?: string;
    category?: string;
}

export const getMatchedFilter = (
    query: ProductFilter
) => {
    const { name, category } = query;
    const matchFilter: any = {};
    if (name) {
        matchFilter.$or = [{ title: { $regex: name, $options: 'i' } }];
    }
    if (category) {
        matchFilter.category = category;
    }
    return matchFilter;

}

export const buildPipline = (query: ProductFilter) => {
    const limit = Number(query.limit) || 12;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    const pipline = [
        { $match: getMatchedFilter(query) },
        { $skip: skip },
        { $limit: limit },

    ];
    return { pipline, limit, page };
}

export const getAllProductService = async (query: ProductFilter) => {
    try {
        const { pipline, limit, page } = buildPipline(query);
        const data = await products.aggregate(pipline);
        const totalCount = await products.countDocuments(await getMatchedFilter(query));
        const totalPages = Math.ceil(totalCount / limit);

        return {
            products: data,
            metadata: {
                totalCount,
                totalPages,
                hasMore: page < totalPages,
                currentPage: page
            }
        };
    } catch (error) {
        return error;
    }
}

export const createProductsService = async (productData: any[]) => {
    try {
        const createdProducts = await Promise.all(
            productData.map(async (data): Promise<any> => {
                const product = new products(data);
                await product.save();
                return product;
            })
        );
        return createdProducts;
    } catch (error) {
        return error;
    }
}

export const deleteProductService = async (id: string) => {
    try {
        return await products.findOneAndDelete({ _id: id });
    } catch (error) {
        return error;
    }
}

export const updateProductService = async (id: string, body: IProduct) => {
    try {
        const data = await products.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })
        return data;
    } catch (error) {
        return error;
    }
}

export const getProductByIdService = async (id: string,) => {
    try {
       
        const data = await products.findById(id);

        return data;
    } catch (error) {
        return error;
    }
}
