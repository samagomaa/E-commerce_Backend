import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique : [ true , 'name is required'],
        trim: true,
        required: true,
        minLength:[1 , 'too short coupon code']
    },
    expire: Date,
    discount:{
        type: Number,
        required: true
    },
    categoryBy:{
        type: Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)