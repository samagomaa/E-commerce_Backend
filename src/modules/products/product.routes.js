import express from "express"
import * as productController from './product.controller.js'
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { uploadfields } from "../../service/fileUplouds/fileUploud.js"
import {addProductVal, paramsIdVal, updateProductVal} from './product.validation.js'


const productRouter = express.Router()

productRouter
.route('/')
.post(uploadfields([{name : 'imageCov' , maxCount:1} , {name : 'images' , maxCount:10}]),validation(addProductVal),catchError(productController.addProduct))
.get(catchError(productController.getAllProducts))


productRouter
.route('/:id')
.get(validation(paramsIdVal),catchError(productController.getSingleProduct))
.put(uploadfields({name : 'imageCov' , maxCount:1} , {name : 'images' , maxCount:10}),validation(updateProductVal),catchError(productController.updateProduct))
.delete(validation(paramsIdVal),catchError(productController.deleteProduct))



export default productRouter