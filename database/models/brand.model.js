import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String,
    categoryBy: {
        type: Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

schema.post('init' , function(doc) {
    doc.logo = process.env.BASE_URL  + 'uploads/' + doc.logo
})


export const brandModel = mongoose.model('brand', schema)