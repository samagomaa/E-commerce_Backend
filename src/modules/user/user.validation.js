import joi from 'joi'


const signUpSchema = joi.object({
    name: joi.string().min(2).max(10).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
    repassword: joi.valid(joi.ref('password')).required(),
    role : joi.string().valid('user' , 'admin').required()
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),
})


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24)
})

const updateUserVal = joi.object({
    id: joi.string().hex().length(24),
    name: joi.string().min(2).max(10),
    email: joi.string().email(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    role : joi.string().valid('user' , 'admin')
})

const updatePasswordVal = joi.object({
    id: joi.string().hex().length(24),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    newpassword: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
})

export {
    signInSchema,
    signUpSchema,
    paramsIdVal,
    updateUserVal,
    updatePasswordVal
}