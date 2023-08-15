import  express  from "express";
import Communication from "../models/communicationModel.js";

const communicationRouter = express.Router()

communicationRouter.post('/',async (req,res)=>{

    const com = new Communication({
        communicationName: req.body.communicationName,
        communicationEmail: req.body.communicationEmail,
        communicationKonu: req.body.communicationKonu,
    })

    const comSon = await com.save()

    res.send({comSon, message: "Mesajınız iletildi"})
 
})

export default communicationRouter