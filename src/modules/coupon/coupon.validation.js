import joi from 'joi'


const addCouponVal = joi.object({
    code: joi.string().min(2).max(200).required().trim(),
    discount : joi.number().min(0).required(),
    expire : joi.date().required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateCouponVal = joi.object({
    id: joi.string().hex().length(24).required(),
    code: joi.string().min(2).max(200).required().trim(),
    discount : joi.number().min(0).required(),
    expire : joi.date().required()
})
export {
    addCouponVal,
    paramsIdVal,
    updateCouponVal
}