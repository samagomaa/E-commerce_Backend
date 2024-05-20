import express from "express"
import * as brandController from './brand.controller.js'
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { uploadSingleFile } from "../../service/fileUplouds/fileUploud.js"
import { addBrandVal, paramsIdVal, updateBrandVal } from "./brand.validation.js"
const brandRouter = express.Router()

brandRouter
.route('/')
.post(uploadSingleFile('logo'),validation(addBrandVal),catchError(brandController.addBrand))
.get(catchError(brandController.getAllBrands))


brandRouter
.route('/:id')
.get(validation(paramsIdVal),catchError(brandController.getSingleBrand))
.put(uploadSingleFile('logo'),validation(updateBrandVal),catchError(brandController.updateBrand))
.delete(validation(paramsIdVal),catchError(brandController.deleteBrand))



export default brandRouter