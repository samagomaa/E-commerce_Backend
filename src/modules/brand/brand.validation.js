import joi from 'joi'


const addBrandVal = joi.object({
    name: joi.string().min(2).max(100).required().trim(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    }).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateBrandVal = joi.object({
    name: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    }).required()
})
export {
    addBrandVal,
    paramsIdVal,
    updateBrandVal
}