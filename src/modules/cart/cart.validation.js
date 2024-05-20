import joi from 'joi'


const addToCartVal = joi.object({
    product : joi.string().hex().length(24).required(),
    quantity : joi.number().integer().options({convert: false})
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})

const updateQua = joi.object({
    id:joi.string().hex().length(24).required(),
    quantity : joi.number().required().integer().options({convert: false})
})
export {
    addToCartVal,
    paramsIdVal,
    updateQua
}