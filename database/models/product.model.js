import mongoose from "mongoose";
import { Types } from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short title name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short description'],
        maxLength: [1000, 'too long description']
    },
    imageCov: String,
    images: [],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    sold: Number,
    rateAvg: {
        type: Number,
        max: 5,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: Types.ObjectId,
        ref: "subcategory"
    },
    brand: {
        type: Types.ObjectId,
        ref: "brand"
    },
    rateCount: Number,
    categoryBy: {
        type: Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true ,toJSON: { virtuals: true } })

schema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
});

schema.pre("findOne" , function(){
    this.populate('myReviews')
})

schema.post('init', function (doc) {
    if (doc.imageCov || doc.images)
        doc.imageCov = process.env.BASE_URL + 'uploads/' + doc.imageCov;
    doc.images = doc.images?.map((img) => process.env.BASE_URL + 'uploads/' + img)
})

export const productModel = mongoose.model('product', schema)