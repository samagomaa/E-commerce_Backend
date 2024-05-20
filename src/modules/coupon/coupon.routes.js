import express from "express"
import * as couponController from "./coupon.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { auth } from "../../middleware/auth.js"
import { addCouponVal, paramsIdVal, updateCouponVal } from "./coupon.validation.js"
const couponRouter = express.Router()

couponRouter
.route('/')
.post(auth ,validation(addCouponVal),catchError(couponController.addCoupon))
.get(catchError(couponController.getAllCoupons))


couponRouter
.route('/:code')
.get(validation(paramsIdVal),catchError(couponController.getSingleCoupon))
.patch(auth , validation(updateCouponVal),catchError(couponController.updateCoupon))
.delete(auth , validation(paramsIdVal),catchError(couponController.deleteCoupon))



export default couponRouter