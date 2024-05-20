import express from "express"
import * as addressController from "./address.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { auth } from "../../middleware/auth.js"
import { addAddressVal, paramsIdVal } from "./address.validation.js"
const addressRouter = express.Router()

addressRouter
.route('/')
.patch(auth ,validation(addAddressVal),catchError(addressController.addAddresse))
.get(auth , addressController.getLoggedUseraddress)

addressRouter
.route('/:id')
.delete(auth , validation(paramsIdVal),catchError(addressController.deleteAddress))



export default addressRouter