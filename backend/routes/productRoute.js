import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddlewares.js';
import { createProductController, deleteProductController, filterProductByCategory, getProductController, getSingleProductController, productCountController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();
//routers
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//routers
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

router.post("/product-category", filterProductByCategory);


//get products
router.get('/get-product', getProductController);

//get single products
router.get('/get-product/:slug', getSingleProductController);


//get photo
router.get('/product-photo/:pid', productPhotoController);


//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController)


//search product
router.get('/search/:keyword', searchProductController)

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);

export default router;