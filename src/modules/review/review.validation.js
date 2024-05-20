import joi from 'joi'


const addReviewVal = joi.object({
    text: joi.string().min(2).max(100).required().trim(),
    rate : joi.number().min(0).max(5).required(),
    product : joi.string().hex().length(24)
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateReviewVal = joi.object({
    id: joi.string().hex().length(24).required(),
    text: joi.string().min(2).max(100).trim(),
    rate : joi.number().min(0).max(5),
    product : joi.string().hex().length(24)
})
export {
    addReviewVal,
    paramsIdVal,
    updateReviewVal
}