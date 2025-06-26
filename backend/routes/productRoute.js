import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddlewares.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();
//routers
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//routers
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);


//get products
router.get('/get-product', getProductController);

//get single products
router.get('/get-product/:slug', getSingleProductController);


//get photo
router.get('/product-photo/:pid', productPhotoController);


//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);

export default router;