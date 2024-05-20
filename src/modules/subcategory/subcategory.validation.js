import joi from 'joi'


const addSubCategoryVal = joi.object({
    name: joi.string().min(2).max(100).required().trim(),
    category : joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateSubCategoryVal = joi.object({
    name: joi.string().min(2).max(100).trim(),
    id: joi.string().hex().length(24),
    category : joi.string().hex().length(24)
})
export {
    addSubCategoryVal,
    paramsIdVal,
    updateSubCategoryVal
}