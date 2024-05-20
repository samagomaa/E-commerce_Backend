import express from "express"
import * as subcategoryController from './subcategory.controller.js'
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from "./subcategory.validation.js"
const subCategoryRouter = express.Router({mergeParams: true})

subCategoryRouter
.route('/')
.post(validation(addSubCategoryVal),catchError(subcategoryController.addsubCategory))
.get(catchError(subcategoryController.getAllsubCategories))


subCategoryRouter
.route('/:id')
.get(validation(paramsIdVal),catchError(subcategoryController.getSingleSubCategory))
.put(validation(updateSubCategoryVal),catchError(subcategoryController.updatesubCategory))
.delete(validation(paramsIdVal),catchError(subcategoryController.deletesubCategory))



export default subCategoryRouter