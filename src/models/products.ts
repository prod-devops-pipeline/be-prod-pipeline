import mongoose, { model } from "mongoose";
export type TCategory =
    | "beauty"
    | "fragrances"
    | "furniture"
    | "groceries";

export interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    image: {
        src: string,
        altName: string;
    }
    category: TCategory;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    image: {
        src: { type: String, require: true },
        altName: { type: String, require: true },
    },
    category: {
        type: String,
        required: true,
        enum: ["beauty", "fragrances", "furniture", "groceries"] satisfies TCategory[],
    },
    rating: {
        type: Number,
    }

},
    {
        timestamps: true 
    }

)

export default model('product', productSchema);