import { ObjectId } from "mongodb";
import Categories from "../models/categories.model.js";

const createCategories = async(req, res) => {
    const category = req.body;
    if (!category.category_name) {
        return res.status(404).send({error: "Request Value is not available"});
    }
    const result = await Categories.create(category);
    if (!result._id) {
        return res.status(404).send({error: "Category is not found"});
    }
    
    res.status(200).send(result);
}

const getCategories = async(req, res) => {
    const result = await Categories.find();
    if (!result) {
        return res.status(404).send({error: "Categories are not found"});
    }
    res.status(200).send(result);
}

const getCategory = async(req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).send({error: "Id is not found"});
    }
    const query = {_id: new ObjectId(id)};
    const result = await Categories.findOne(query);
    res.status(200).send(result);
}

const updateCategory = async(req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id && !updateCategory) {
        return res.status(404).send({error: "Data is not found"});
    }
    const result = await Categories.findByIdAndUpdate(id, updateData);
    if (!result) {
        return res.status(404).send({error: "Not Updated Something went wron"});
    }
    res.status(200).send(result);
}

const deleteCategory = async(req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).send({error: "Id is not found"});
    }
    const query = {_id: new ObjectId(id)};
    const result = await Categories.deleteOne(query);
    res.status(200).send(result);
}

export {createCategories, getCategories, deleteCategory, getCategory, updateCategory};