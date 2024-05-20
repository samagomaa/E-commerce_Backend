import express from "express"
import * as categoryController from './category.controller.js'
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js"
import { uploadSingleFile } from "../../service/fileUplouds/fileUploud.js"
import subCategoryRouter from "../subcategory/subcategory.routes.js"
const categoryRouter = express.Router()

categoryRouter.use('/:category/subcategory' , subCategoryRouter)

categoryRouter
.route('/')
.post(uploadSingleFile('img'),validation(addCategoryVal),catchError(categoryController.addCategory))
.get(catchError(categoryController.allCategories))


categoryRouter
.route('/:id')
.get(validation(paramsIdVal),catchError(categoryController.getSingleCategory))
.put(uploadSingleFile('img'),validation(updateCategoryVal),catchError(categoryController.updateCategory))
.delete(validation(paramsIdVal),catchError(categoryController.deleteCategory))



export default categoryRouter