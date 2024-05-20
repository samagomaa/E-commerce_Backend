import express from "express"
import * as wishController from "./wishlist.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { auth } from "../../middleware/auth.js"
import { addWishlistVal, paramsIdVal } from "./wishlist.validation.js"
const wishlistRouter = express.Router()

wishlistRouter
.route('/')
.patch(auth ,validation(addWishlistVal),catchError(wishController.addToWishlist))
.get(auth , wishController.getLoggedUserWishlist)

wishlistRouter
.route('/:id')
.delete(auth , validation(paramsIdVal),catchError(wishController.deleteFromWishlist))



export default wishlistRouter