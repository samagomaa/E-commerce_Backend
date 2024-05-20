import joi from 'joi'


const addWishlistVal = joi.object({
    product : joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateWishlistVal = joi.object({
    product : joi.string().hex().length(24).required()
})
export {
    addWishlistVal,
    paramsIdVal,
    updateWishlistVal
}