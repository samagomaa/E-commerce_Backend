import { ApiFeaturs } from "../../utils/apiFeaturs.js"
import { reviewModel } from "../../../database/models/review.model.js"
import { AppError } from "../../utils/appError.js"

const addReview = async (req, res, next) => {
    req.body.user = req.user.userId
    let isReviewExist = reviewModel.findOne({user:req.body.user , product:req.body.product })
    if(isReviewExist) return next(new AppError("You added comment before"))
    const review = new reviewModel(req.body)
    await review.save()
    res.json({ success: true, review })
}

const getAllReviews = async (req, res, next) => {
        let apiFeaturs = new ApiFeaturs(reviewModel.find(), req.query)
        .feilds().filteration().paggination().search().sort()
        const reviews = await apiFeaturs.mongooseQuery
        res.json({ success: true, pages: apiFeaturs.pageNum, reviews })
}

const getSingleReview = async (req, res, next) => {
    const review = await reviewModel.findById(req.params.id)
    !review && res.status(404).json({ message: "Review not found" })
    review && res.json({ success: true, review })
}

const updateReview = async (req, res, next) => {
    const review = await reviewModel.findOneAndUpdate({user : req.user.userId , product : req.params.product }, req.body, { new: true })
    !review && res.status(404).json({ message: "Review not found" })
    review && res.json({ success: true, review })
}

const deleteReview = async (req, res, next) => {
    const review = await reviewModel.findByIdAndDelete({user : req.user.userId , product : req.params.product }, req.body, { new: true })
    !review && res.status(404).json({ message: "Review not found" })
    review && res.json({ success: true, review })
}

export { addReview, getAllReviews, getSingleReview, updateReview, deleteReview }