

export const globalError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    if(process.env.MODE == "development"){
        return res.status(err.statusCode).json({message: err.message , stack : err.stack})
    }else{
        return res.status(err.statusCode).json({message: err.message})

    }
}