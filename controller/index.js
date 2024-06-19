import { createCategories, deleteCategory, getCategories, getCategory, updateCategory } from "./categories.controller.js";
import {createProduct, getCategoryProduct, getLimitProducts, getLoadProducts, getProduct, getProductById, getSlideProducts, updateProduct} from "./product.controller.js";

const index =  (req, res) => {
    res.send("Server is Running");
}

export {index, createProduct, getProduct, createCategories, getCategories, getCategory, deleteCategory, updateCategory, getLimitProducts, getProductById, updateProduct, getLoadProducts, getSlideProducts, getCategoryProduct};