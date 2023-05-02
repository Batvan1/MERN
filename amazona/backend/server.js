import  express  from "express";
import data from "./data.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoute.js";
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/seed', seedRouter)
app.use('/api/product', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next)=>{
    console.log("app use içerisindeki 4 parametreli olay çalıştı")
    res.status(500).send({messagee: err.message})
})


dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("connect succesfully"))
.catch(err => console.log(err))





const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`backend server ${port} portundan çalıştı`)
})