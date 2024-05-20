import mongoose from "mongoose"
import multer from "multer"

export const fileUpload = ()=>{
    const storage = multer.diskStorage({
        destination:(req,file,cd)=>{
            cd(null,'uploads/')
        },
        filename:(req,file,cd)=>{
            cd(null, new mongoose.Types.ObjectId + "-" + file.originalname)
        }
    })
    function fileFilter(req,file,cd){
        if(file.mimetype.startsWith("image")){
            cd(null,true)
        }else{
            cd(new AppErrorO('images only' , 401) , false)
        }
    }
    const upload = multer({storage,fileFilter})
    return upload
}

export const uploadSingleFile = fileName => fileUpload().single(fileName)
export const uploadArrayOfFiles = fileName => fileUpload().array(fileName, 10)
export const uploadfields = fields => fileUpload().fields(fields)
