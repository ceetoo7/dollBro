import express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  categoryContoller,
  singleCategoryController,
} from "../controllers/categoryController.js";

import {
  requireSignIn,
  isAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Create category (admin only)
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update category (admin only)
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get all categories (public)
router.get("/get-category", categoryContoller);

// Get single category by slug (public)
router.get("/single-category/:slug", singleCategoryController);

// Delete category (admin only)
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
