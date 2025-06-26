import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import mongoose from "mongoose";


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, color, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(400).send({ error: "Photo should be less than 1MB" });
        }

        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
        });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        return res.status(201).send({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};



//get all products
export const getProductController = async (req, res) => {
    try {
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });

        return res.status(200).send({

            success: true,
            counTotal: product.length,
            message: "All products",
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        });
    }
}


//get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        return res.status(200).send({
            success: true,
            message: "Single Product",
            product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting single products',
            error
        });
    }
};


//get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product?.photo?.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            return res.status(404).send({
                success: false,
                message: "Photo not found",
            });
        }
    } catch (error) {
        console.error("Photo fetch error:", error);
        return res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};





//delete controller
export const deleteProductController = async (req, res) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        console.log("Trying to delete product:", req.params.pid);
        const result = await productModel.deleteOne({ _id: req.params.pid });
        console.log("Delete result:", result);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Minimal delete error:", error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Error while deleting product",
                error: error.message || error,
            });
        }
    }
};











//update product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, color, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is required" });
            case !description:
                return res.status(400).send({ error: "Description is required" });
            case !price:
                return res.status(400).send({ error: "Price is required" });
            case !category:
                return res.status(400).send({ error: "Category is required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(400).send({ error: "Photo should be less than 1MB" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
}