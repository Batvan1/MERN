import mongoose from "mongoose";

const IyzicoPaymentSchema = new mongoose.Schema({

    sendData: {
        type: Object,
        required: true,
        trim: true
    },

    resultData:{
        type: Object,
        required: true,
        trim: true
    }
})

const Payment = mongoose.model("IyzicoPayment", IyzicoPaymentSchema)

export default Payment

