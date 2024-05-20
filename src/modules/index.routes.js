import { globalError } from "../middleware/globalError.js"
import { AppError } from "../utils/appError.js"
import addressRouter from "./addresse/address.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./products/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"



export const bootstrap = (app)=>{
    app.use("/api/v1/categories",categoryRouter)
    app.use("/api/v1/subcategories",subCategoryRouter)
    app.use("/api/v1/brand",brandRouter)
    app.use("/api/v1/product",productRouter)
    app.use("/api/v1/user",userRouter)
    app.use("/api/v1/reviews",reviewRouter)
    app.use("/api/v1/wishlist",wishlistRouter)
    app.use("/api/v1/address",addressRouter)
    app.use("/api/v1/coupon",couponRouter)
    app.use("/api/v1/cart",cartRouter)
    app.use("/api/v1/order",orderRouter)
    app.all('*' , (req,res,next)=>{next( new AppError(`invalid rounting : ${req.originalUrl} ` , 400))})
    app.use(globalError)
}