import slugify from "slugify"
import { brandModel } from "../../../database/models/brand.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeaturs } from "../../utils/apiFeaturs.js"

const addBrand = async(req,res,next)=>{
    req.body.slug = slugify(req.body.name) 
    req.body.logo = req.file.filename
    const brand = new brandModel(req.body)
    await brand.save()
    res.json({success: true , brand})
}

const getAllBrands = async(req,res,next)=>{
    let apiFeaturs = new ApiFeaturs(brandModel.find(), req.query).feilds().filteration().paggination().search().sort()
    const brands = await apiFeaturs.mongooseQuery
    res.status(200).json({success: true , pages : apiFeaturs.pageNum , brands})
}

const getSingleBrand = async(req,res,next)=>{
    const brand = await categoryModel.findById(req.params.id)
    !brand && res.status(404).json({message:"category not found"})
    brand && res.json({success: true , brand})
}

const updateBrand = async(req,res,next)=>{
    if(req.body.name){req.body.slug = slugify(req.body.name)}
    if(req.file){req.body.logo = req.file.filename}
    const brand = await brandModel.findByIdAndUpdate(req.params.id , req.body  , {new:true})
    !brand && res.status(404).json({message:"brand not found"})
    brand && res.json({success: true , brand})
}

const deleteBrand = deleteOne(brandModel)

export{addBrand, getAllBrands , getSingleBrand , updateBrand , deleteBrand}