import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

// Create Category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }

        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        console.log("CREATE CATEGORY ERROR:", error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in category",
        });
    }
};

// Update Category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.log("UPDATE CATEGORY ERROR:", error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while updating category",
        });
    }
};

// Get All Categories
export const categoryContoller = async (req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories list",
            category,
        });
    } catch (error) {
        console.log("GET ALL CATEGORY ERROR:", error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while getting all categories",
        });
    }
};

// Get Single Category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Single category retrieved",
            category,
        });
    } catch (error) {
        console.log("GET SINGLE CATEGORY ERROR:", error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while getting single category",
        });
    }
};



//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while deleting category',
            error
        })
    }
};

