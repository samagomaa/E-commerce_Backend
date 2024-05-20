import bcrypt from 'bcrypt'
import { AppError } from "../../utils/appError.js";
import { userModel } from '../../../database/models/user.model.js';
import jwt from 'jsonwebtoken'
import { ApiFeaturs } from '../../utils/apiFeaturs.js';

//sign-up
const signUp = async (req,res,next)=>{
    const{name, email ,  password , role } = req.body;
    const user = {
        name, 
        email , 
        password , 
        role
    }
    const newUser = await userModel.create(user)
    res.status(200).json({
        success: true,
        message:"user added successfully",
        newuser: {name: newUser.name , email: newUser.email}
    })
}

// sign in
const signIn = async (req,res,next)=>{
const {password , email } = req.body
const isExist = await userModel.findOne({email})
if(isExist && bcrypt.compareSync(password , isExist.password) ){
    isExist.status = "online";
    let token = jwt.sign({ userId: isExist._id , role: isExist.role}, process.env.SECRET_KEY)
    await isExist.save(); 
    return res.json({ success:true ,message:"user logged in successfuly" , token})
}else{
    return res.json({ success:false ,message:"password or email wrong..."})
}
}

//update account
const updateUser = async(req,res,next)=>{
    const{name, email ,  password , role } = req.body;
    const user = {
        name, 
        email , 
        password , 
        role
    }
if(req.user.userId == req.params.id){
const account = await userModel.findByIdAndUpdate(req.params.id , user , {new:true})
!account && res.status(204).json({message:"user not found"})
account && res.json({success: true , account})
}else{
    res.status(401).json({message:"Only the owner can update the account"})
}
}

//delete account
const deleteUser = async(req,res,next)=>{
if(req.user.userId == req.params.id){
    const account = await userModel.findByIdAndDelete(req.params.id)
!account && res.status(204).json({message:"user not found"})
account && res.json({success: true , account})
}else{
    res.status(401).json({message:"Only the owner can delete the account"})
}
}


//get user data
const getAllUsers = async(req,res,next)=>{
    let  identifier = {}
    if(req.query.keyword) identifier = {name: { $regex: req.query.keyword }}
    let apiFeaturs = new ApiFeaturs(userModel.find(), req.query)
    .feilds().filteration().paggination().search().sort()
    const users = await apiFeaturs.mongooseQuery
    res.json({success: true , pages : apiFeaturs.pageNum , users})
}

//change password
const changePassword = async(req,res,next)=>{
    const isExist = await userModel.findById(req.params.id)
    if(isExist && bcrypt.compareSync(req.body.password , isExist.password) ){
        let token = jwt.sign({ userId: isExist._id , role: isExist.role }, process.env.SECRET_KEY)
        await userModel.findByIdAndUpdate(req.params.id , {password: req.body.newPassword , passwordChangeAt : Date.now()})
        return res.status(200).json({ success:true ,message:"password change successfuly" , token})
    }else{
        next(new AppError( "wrong password" , 401 ))
    } 
}

export{signUp , signIn , updateUser, deleteUser , getAllUsers , changePassword}