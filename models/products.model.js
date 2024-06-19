import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    product_name: {type: String, required: true},
    product_slug: {type: String, required: true},
    product_img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    select: {type: String, required: true},
    stock: {type: Number, required: true},
    discount: {type: Number, required: true}
});

const Product = mongoose.model('Product', productSchema);

export default Product;
