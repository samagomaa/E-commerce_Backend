import slugify from "slugify"
import { productModel } from "../../../database/models/product.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeaturs } from "../../utils/apiFeaturs.js"

const addProduct = async(req,res,next)=>{
    req.body.slug = slugify(req.body.title) 
    req.body.imageCov = req.files.imageCov[0].filename
    req.body.images = req.files.images.map((img)=> img.filename )
    const Product = new productModel(req.body)
    await Product.save()
    res.json({success: true , Product})
}

const getAllProducts = async(req,res,next)=>{
    let identifier ={}
    if(req.query.keyword) identifier = {$or: [{ title: { $regex: req.query.keyword } },{ description: { $regex: req.query.keyword } }]}
    let apiFeaturs = new ApiFeaturs(productModel.find(identifier), req.query).feilds().filteration().paggination().search().sort()
    const products = await apiFeaturs.mongooseQuery
    res.json({success: true , pages : apiFeaturs.pageNum , products})
}

const getSingleProduct = async(req,res,next)=>{
    const products = await productModel.findById(req.params.id)
    !products && res.status(404).json({message:"Product not found"})
    products && res.json({success: true , products})
}

const updateProduct = async(req,res,next)=>{
    if(req.body.name){req.body.slug = slugify(req.body.title)}
    if(req.files.imageCov){req.body.imageCov = req.files.imageCov[0].filename}
    if(req.files.images){req.body.images = req.files.images.map((img)=>{img.filename})}
    const products = await productModel.findByIdAndUpdate(req.params.id , req.body  , {new:true})
    !products && res.status(404).json({message:"Product not found"})
    products && res.json({success: true , products})
}

const deleteProduct = deleteOne(productModel)

export{addProduct, getAllProducts , getSingleProduct , updateProduct , deleteProduct}