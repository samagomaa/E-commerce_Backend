import { userModel } from "../../../database/models/user.model.js"




const addAddresse = async (req, res, next) => {
    const address = await userModel.findByIdAndUpdate( req.user.userId ,
        {$addToSet:{address: req.body}}, { new: true })
    !address && res.status(404).json({ message: "address not found" })
    address && res.json({ success: true, address: address.addresses })
}
const deleteAddress = async (req, res, next) => {
    const address = await userModel.findByIdAndUpdate( req.user.userId ,
        {$pull:{addresses: {_id : req.params.id}}}, { new: true })
    !address && res.status(404).json({ message: "address not found" })
    address && res.json({ success: true, address: address.addresses })
}
const getLoggedUseraddress = async (req, res, next) => {
    const {addresses} = await userModel.findById(req.user.userId)
    addresses && res.json({ success: true, addresses })
}


export { addAddresse  , deleteAddress , getLoggedUseraddress}