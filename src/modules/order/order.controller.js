import { cartModel } from "../../../database/models/cart.model.js"
import { orderModel } from "../../../database/models/order.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { AppError } from "../../utils/appError.js"




const createCashOrder = async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let order = new orderModel({
        user : req.user.userId,
        orderItems : cart.cartItems,
        totalOrderPrice,
        shippingAddress : req.body.shippingAddress
    })
    await order.save()
    //increment sold & decrement quantity
    let options = cart.cartItems.map((prod)=>{
        return (
            {
                updateOne : {
                    "filter" : {_id: prod.product},
                    "update" : {$inc : {sold : prod.quantity , quantity : -prod.quantity}}
                }
            }
        )
    })
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({success : true , order})
}

const getSpecificOrder = async(req,res,next)=>{
    let order = await orderModel.findOne({user : req.user.userId}).populate('cartItems.product')
    res.status(200).json({success: true , order})
}

const getAllOrders = async(req,res,next)=>{
    let orders = await orderModel.find({}).populate('cartItems.product')
    res.status(200).json({success: true , orders})
}







export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders
}