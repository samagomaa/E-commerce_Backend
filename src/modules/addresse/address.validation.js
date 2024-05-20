import joi from 'joi'


const addAddressVal = joi.object({
    street : joi.string().trim().required ,
    phone: joi.string().trim().required ,
    city : joi.string().trim().required 
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateAddress = joi.object({
    id:joi.string().hex().length(24),
    street : joi.string().trim() ,
    phone: joi.string().trim() ,
    city : joi.string().trim() 
})
export {
    addAddressVal,
    paramsIdVal,
    updateAddress
}