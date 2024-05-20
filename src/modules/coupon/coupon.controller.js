import { ApiFeaturs } from "../../utils/apiFeaturs.js"
import { AppError } from "../../utils/appError.js"
import { couponModel } from "../../../database/models/coupon.model.js"

const addCoupon = async (req, res, next) => {
    let iscouponExist = couponModel.findOne({code:req.body.code})
    if(iscouponExist) return next(new AppError("You added coupon before"))
    const coupon = new couponModel(req.body)
    await coupon.save()
    res.json({ success: true, coupon })
}

const getAllCoupons = async (req, res, next) => {
        let apiFeaturs = new ApiFeaturs(couponModel.find(), req.query)
        .feilds().filteration().paggination().search().sort()
        const coupons = await apiFeaturs.mongooseQuery
        res.json({ success: true, pages: apiFeaturs.pageNum, coupons })
}

const getSingleCoupon = async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({ message: "coupon not found" })
    coupon && res.json({ success: true, coupon })
}

const updateCoupon = async (req, res, next) => {
    const coupon = await couponModel.findOneAndUpdate({user : req.user.userId , code : req.params.code }, req.body, { new: true })
    !coupon && res.status(404).json({ message: "coupon not found" })
    coupon && res.json({ success: true, coupon })
}

const deleteCoupon = async (req, res, next) => {
    const coupon = await couponModel.findByIdAndDelete({user : req.user.userId , code : req.params.code }, req.body, { new: true })
    !coupon && res.status(404).json({ message: "coupon not found" })
    coupon && res.json({ success: true, coupon })
}

export { addCoupon, getAllCoupons, getSingleCoupon, updateCoupon, deleteCoupon }