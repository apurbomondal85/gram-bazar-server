import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema({
    category_name: {type: String, require: true},
    category_slug: {type: String, require: true},
    category_img: {type: String, require: true},
    category_icon: {type: String, require: true}
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;