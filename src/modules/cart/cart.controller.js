import { cartModel } from "../../../database/models/cart.model.js"
import { couponModel } from "../../../database/models/coupon.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { AppError } from "../../utils/appError.js"

const calcTotalPrice = (cart) => {
    let totalPrice = 0
    cart.cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity
    })
    cart.totalPrice = totalPrice
    if (cart.discount) {
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    }
}


const addToCart = async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError("product not found", 404))
    if (req.body.quantity > product.quantity) return next(new AppError("sold out", 404))
    req.body.price = product.price
    const isCartExist = await cartModel.findOne({ user: req.user.userId })
    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user.userId,
            cartItems: [req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        !cart && res.status(404).json({ message: "cart not found" })
        cart && res.json({ success: true, cart })
    } else {
        let item = isCartExist.cartItems.find((item) => item.product == req.body.product)
        if (item) {
            if (item.quantity >= product.quantity) return next(new AppError("sold out", 404))
            item.quantity += req.body.quantity || 1
        }
        else isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({ success: true, cart: isCartExist })
    }

}


const removeItemFromCart = async (req, res, next) => {
    const cart = await cartModel.findOneAndUpdate({ user: req.user.userId },
        { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    calcTotalPrice(cart)
    await cart.save()
    !cart && res.status(404).json({ message: "cart not found" })
    cart && res.json({ success: true, cart })
}

const updateQuantity = async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user.userId })
    !cart && res.status(404).json({ message: "cart not found" })
    let item = cart.cartItems.find(item => item._id == req.params.id)
    if (!item) return next(new AppError("item not found", 404))
    item.quantity == req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart && res.json({ success: true, cart })
}

const getLoggedUsercart = async (req, res, next) => {
    const { cart } = await cartModel.findOne({ user: req.user.userId }).populate('cartItems.product')
    !cart && res.status(404).json({ message: "cart not found" })
    cart && res.json({ success: true, cart })
}

const clearUsercart = async (req, res, next) => {
    const { cart } = await cartModel.findOneAndDelete({ user: req.user.userId })
    !cart && res.status(404).json({ message: "cart not found" })
    cart && res.json({ success: true, cart })
}

const applyCoupon = async (req, res, next) => {
    let coupon = await couponModel.findOne({code : req.body.coupon , expire : { $gte : Date.now() }})
    if (!coupon) return next(new AppError(" invalid coupon", 401))
    let cart = await cartModel.findOne({ user: req.user.userId })
    if (!cart) return next(new AppError("cart not found", 401))
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save()
    cart && res.json({ success: true, cart })
}


export {
    addToCart,
    removeItemFromCart,
    updateQuantity,
    getLoggedUsercart,
    clearUsercart,
    applyCoupon
}