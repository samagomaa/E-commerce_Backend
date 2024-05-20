import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum :["user", "admin"],
        default: "user"
    },
    passwordChangeAt : Date,
    wishllist: [{ type : Types.ObjectId , ref : "product"}],
    addresses :[{ street : String , phone: String , city : String}]
}, { timestamps: true })


export const userModel = mongoose.model('user', schema)