import joi from 'joi'


const createOrderVal = joi.object({
    id : joi.string().hex().length(24).required(),
    shippingAddress : joi.object({
        street : joi.string().trim().required(),
        city : joi.string().trim().required(),
        phone : joi.string().trim().required()
    }).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})

const updateQua = joi.object({
    id:joi.string().hex().length(24).required(),
    quantity : joi.number().required().integer().options({convert: false})
})
export {
    createOrderVal,
    paramsIdVal,
    updateQua
}