import mongoose from "mongoose"

const communicationSchema = new mongoose.Schema({
    communicationName: {type: String, required: true},

    communicationEmail: {type: String, required: true},

    communicationKonu: {type: String, required: true}
})


const Communication = mongoose.model("communication", communicationSchema)

export default Communication



