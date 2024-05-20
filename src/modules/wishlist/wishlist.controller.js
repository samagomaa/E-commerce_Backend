import { userModel } from "../../../database/models/user.model.js"








const addToWishlist = async (req, res, next) => {
    const wishlist = await userModel.findByIdAndUpdate( req.user.userId ,
        {$addToSet:{wishllist: req.body.product}}, { new: true }).populate("wishlist")
    !wishlist && res.status(404).json({ message: "wishlist not found" })
    wishlist && res.json({ success: true, wishlist })
}
const deleteFromWishlist = async (req, res, next) => {
    const wishlist = await userModel.findByIdAndUpdate( req.user.userId ,
        {$pull:{wishllist: req.params.id}}, { new: true })
    !wishlist && res.status(404).json({ message: "wishlist not found" })
    wishlist && res.json({ success: true, wishlist })
}
const getLoggedUserWishlist = async (req, res, next) => {
    const {wishlist} = await userModel.findById(req.user.userId).populate("wishlist")
    !wishlist && res.status(404).json({ message: "wishlist not found" })
    wishlist && res.json({ success: true, wishlist })
}


export { addToWishlist  , deleteFromWishlist , getLoggedUserWishlist}