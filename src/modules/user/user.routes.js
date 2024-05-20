import express from "express"
import * as userController from './user.controller.js'
import { catchError } from "../../middleware/catchError.js"
import { validation } from "../../middleware/validation.js"
import { signInSchema, signUpSchema, updatePasswordVal, updateUserVal } from "./user.validation.js"
import { auth } from "../../middleware/auth.js"
import { checkEmailExist } from "../../middleware/checkEmailExist.js"
import { hashPassword } from "../../middleware/hashPassword.js"
const userRouter = express.Router({mergeParams: true})

userRouter
.route('/')
.post(validation(signUpSchema), checkEmailExist , hashPassword ,catchError(userController.signUp))
.get(catchError(userController.getAllUsers))


userRouter.route('/signin').post(validation(signInSchema),catchError(userController.signIn))

userRouter
.route('/:id')
.put( auth ,validation(updateUserVal),userController.updateUser)
.delete( auth ,validation(updateUserVal),userController.deleteUser)
.patch( auth ,validation(updatePasswordVal),userController.changePassword)


export default userRouter
