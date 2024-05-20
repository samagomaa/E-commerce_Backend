import express from "express"
import * as cartController from "./cart.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { auth } from "../../middleware/auth.js"
import { addToCartVal, paramsIdVal, updateQua } from "./cart.validation.js"
const cartRouter = express.Router()

cartRouter
.route('/')
.patch(auth ,validation(addToCartVal),catchError(cartController.addToCart))
.get(auth , cartController.getLoggedUsercart)
.delete(auth , cartController.clearUsercart)

cartRouter.post('/applycoupon' , auth , cartController.applyCoupon)

cartRouter
.route('/:id')
.delete(auth , validation(paramsIdVal),catchError(cartController.removeItemFromCart))
.patch(auth , validation(updateQua),catchError(cartController.updateQuantity))



export default cartRouter