import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category:{
        type: Types.ObjectId,
        ref:"category"
    },
    categoryBy:{
        type: Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true })


schema.pre('find',function() {
    this.populate("category")
})


export const subcategoryModel = mongoose.model('subcategory', schema)