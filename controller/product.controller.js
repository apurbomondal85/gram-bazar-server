import { ObjectId } from "mongodb";
import Product from "../models/products.model.js";
import mongoose from "mongoose";


const createProduct = async (req, res) => {
    const product = req.body;
    if (product.product_name) {
        const result = await Product.create(product);
        return res.status(200).send(result);
    }
    res.status(404).send("Product is not found");
}

const getProduct = async (req, res) => {
    const product = await Product.find();
    if (product) {
        return res.send(product);
    }
    res.status(404).send("Product is not found");
}

const getLimitProducts = async (req, res) => {
    const page = req.query.limit || 1;
    if (parseInt(page)) {
        const limit = 12;
        const skip = (page - 1) * limit;
        try {
            const result = await Product.find().skip(skip).limit(limit);
            res.status(200).send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

}

const getLoadProducts = async (req, res) => {
    const { offset, limit, seenProducts = '' } = req.query;
    const seenProductIds = seenProducts ? seenProducts.split(',') : [];
    try {
        const products = await Product.aggregate([
            { $match: { _id: { $nin: seenProductIds.map(id => new mongoose.Types.ObjectId(id)) } } },
            { $sample: { size: parseInt(limit, 10) * 2 } },
            { $limit: parseInt(limit, 10) }
        ]);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

const getSlideProducts = async (req, res) => {
    const page = req.query.limit || 1;
    if (parseInt(page)) {
        const limit = 4;
        const skip = (page - 1) * limit;
        try {
            const result = await Product.find().skip(skip).limit(limit);
            res.status(200).send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

}

const getCategoryProduct = async (req, res) => {
    const { categories, minPrice, maxPrice, rating } = req.query;

    const matchQuery = {};
    if (categories) matchQuery.select = { $in: categories.split(',') };
    if (minPrice) matchQuery.price = { $gte: Number(minPrice) };
    if (maxPrice) matchQuery.price = { $lte: Number(maxPrice) };

    try {
      const products = await Product.aggregate([
        { $match: matchQuery }
      ]);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
}

const getProductById = async (req, res) => {
    const slug = req.params.slug;
    if (!slug) {
        return res.status(404).send({ error: "Slug is not found" });
    }
    const query = { 'product_slug': slug };
    const result = await Product.findOne(query);
    res.status(200).send(result);
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id && !updateCategory) {
        return res.status(404).send({ error: "Data is not found" });
    }
    const result = await Product.findByIdAndUpdate(id, updateData);
    if (!result) {
        return res.status(404).send({ error: "Not Updated Something went wron" });
    }
    res.status(200).send(result);
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).send({ error: "Id is not found" });
    }
    const query = { _id: new ObjectId(id) };
    const result = await Product.deleteOne(query);
    res.status(200).send(result);
}

export { createProduct, getProduct, getLimitProducts, getLoadProducts, deleteProduct, getProductById, updateProduct, getSlideProducts, getCategoryProduct };