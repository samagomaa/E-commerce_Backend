import slugify from "slugify"
import { subcategoryModel } from "../../../database/models/subcategory.model.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeaturs } from "../../utils/apiFeaturs.js"

const addsubCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const subcategory = new subcategoryModel(req.body)
    await subcategory.save()
    res.json({ success: true, subcategory })
}

const getAllsubCategories = async (req, res, next) => {
    let filter = {}
    if (req.params.category) {
        filter.category = req.params.category;
    }
        let apiFeaturs = new ApiFeaturs(subcategoryModel.find(filter), req.query)
        .feilds().filteration().paggination().search().sort()
        const subcategorys = await apiFeaturs.mongooseQuery
        res.json({ success: true, pages: apiFeaturs.pageNum, subcategorys })
}

const getSingleSubCategory = async (req, res, next) => {
    const subCategories = await subcategoryModel.findById(req.params.id)
    !subCategories && res.status(404).json({ message: "subcategory not found" })
    subCategories && res.json({ success: true, subCategories })
}

const updatesubCategory = async (req, res, next) => {
    const subCategories = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subCategories && res.status(404).json({ message: "subcategory not found" })
    subCategories && res.json({ success: true, subCategories })
}

const deletesubCategory = deleteOne(subcategoryModel)

export { addsubCategory, getAllsubCategories, getSingleSubCategory, updatesubCategory, deletesubCategory }