import express from "express"
import * as orderController from "./order.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { auth } from "../../middleware/auth.js"
import {createOrderVal} from "./order.validation.js"
const orderRouter = express.Router()

orderRouter
.route('/')
.get(auth , orderController.getSpecificOrder)

orderRouter.get('/allorders' , auth , orderController.getAllOrders)

orderRouter
.route('/:id')
.post(auth , validation(createOrderVal),catchError(orderController.createCashOrder))



export default orderRouter