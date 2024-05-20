import joi from 'joi'


const addProductVal = joi.object({
    title: joi.string().min(2).max(100).required().trim(),
    description: joi.string().min(10).max(1000).required().trim(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0).optional(),
    quintity: joi.number().min(0).required(),
    category: joi.string().hex().length(24).required(),
    subCategory: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required(),
    categoryBy: joi.string().hex().length(24).optional(),

    imageCov : joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).required(),

    images : joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateProductVal = joi.object({
    id: joi.string().hex().length(24).required(),
    title: joi.string().min(2).max(100).required().trim(),
    description: joi.string().min(10).max(1000).required().trim(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0).optional(),
    quintity: joi.number().min(0).required(),
    category: joi.string().hex().length(24).required(),
    subCategory: joi.string().hex().length(24).required(),
    brand: joi.string().hex().length(24).required(),
    categoryBy: joi.string().hex().length(24).optional(),
    
    imgCov : joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).required(),

    images : joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname : joi.string().required(),
        encoding : joi.string().required(),
        mimetype: joi.string().valid('image/jpeg' , 'image/png' , 'image/jpg').required(),
        size : joi.number().max(5678954).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).required()
})

export {
    addProductVal,
    paramsIdVal,
    updateProductVal
}