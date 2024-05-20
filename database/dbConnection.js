import mongoose from "mongoose"


export const dbConnection = async ()=>{
    return await mongoose.connect(process.env.MONGOO_URL)
    .then(()=>{console.log("database connect successfully");})
    .catch((err)=>{console.log("database error" , err);})
}