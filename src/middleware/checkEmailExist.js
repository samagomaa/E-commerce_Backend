import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utils/appError.js";



export const checkEmailExist = async (req,res,next)=>{
        const {email} = req.body;
        const isExist = await userModel.findOne({email})
        if(isExist){
            next( new AppError("user already exist" , 409))
        }else{
            next()
        }
}