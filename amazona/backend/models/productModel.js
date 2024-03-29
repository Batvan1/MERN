import mongoose from 'mongoose'


const productSchema = new mongoose.Schema(
    {
     
        name: {type: String, require: true, unique: true},
        slug: {type: String, require: true, unique: true},
        image: {type: String, require: true},
        brand:{type: String, require: true},
        category:{type: String, require: true},
        description:{type: String, require: true},
        price:{type: Number, require: true},
        rating:{type: Number, require: true},
        numReviews:{type: Number, require: true},
        countInStock:{type: Number, require: true},
        status: { type: String, enum: ["new", "used"], required: true }, // durum alanı
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('MERNP',productSchema)

export default Product