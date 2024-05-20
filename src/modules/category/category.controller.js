import slugify from "slugify"
import { categoryModel } from "../../../database/models/category.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeaturs } from "../../utils/apiFeaturs.js"

const addCategory = async(req,res,next)=>{
    req.body.slug = slugify(req.body.name) 
    req.body.image = req.file.filename
    const category = new categoryModel(req.body)
    await category.save()
    res.json({success: true , category})
}

const allCategories = async(req,res,next)=>{
    let apiFeaturs = new ApiFeaturs(categoryModel.find(), req.query).feilds().filteration().paggination().search().sort()
    const categories = await apiFeaturs.mongooseQuery
    res.status(200).json({success: true , pages : apiFeaturs.pageNum , categories})
}

const getSingleCategory = async(req,res,next)=>{
    const categories = await categoryModel.findById(req.params.id)
    !categories && res.status(404).json({message:"category not found"})
    categories && res.json({success: true , categories})
}

const updateCategory = async(req,res,next)=>{
    if(req.body.name){req.body.slug = slugify(req.body.name)}
    if(req.file){req.body.image = req.file.filename}
    const categories = await categoryModel.findByIdAndUpdate(req.params.id , req.body  , {new:true})
    !categories && res.status(404).json({message:"category not found"})
    categories && res.json({success: true , categories})
}

const deleteCategory = deleteOne(categoryModel)

export{addCategory, allCategories , getSingleCategory , updateCategory , deleteCategory}