import express from "express";
import formidable from "express-formidable";
const router = express.Router()

//cotrollers
import {addProduct, updateProductDetails, removeProduct} from '../controllers/productController.js'
import {authenticate, authorizedAdmin} from '../middleware/authMiddleware.js'
import checkId from '../middleware/checkId.js'

router.route('/').post(authenticate, authorizedAdmin, formidable(), addProduct);
router.route('/:id').put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizedAdmin, removeProduct)

export default router;