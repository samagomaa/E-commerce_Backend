import express from "express"
import * as reviewController from "./review.controller.js"
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js"
import { auth } from "../../middleware/auth.js"
const reviewRouter = express.Router()

reviewRouter
.route('/')
.post(auth ,validation(addReviewVal),catchError(reviewController.addReview))
.get(catchError(reviewController.getAllReviews))


reviewRouter
.route('/:id')
.get(validation(paramsIdVal),catchError(reviewController.getSingleReview))
.patch(auth , validation(updateReviewVal),catchError(reviewController.updateReview))
.delete(auth , validation(paramsIdVal),catchError(reviewController.deleteReview))



export default reviewRouter