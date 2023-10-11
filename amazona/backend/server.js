import  express  from "express";
import path from "path"
import dotenv from "dotenv"
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoute.js";
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import communicationRouter from "./routes/communicationRouter.js";

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));
app.use('/api/seed', seedRouter)
app.use('/api/product', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/communication', communicationRouter)


const __dirname = path.resolve() // incele
app.use(express.static(path.join(__dirname, '/frontend/build'))) // incele

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/build/index.html')) // incele
})


app.use((err, req, res, next)=>{
    console.log("app use içerisindeki 4 parametreli olay çalıştı")
    console.log(err)
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