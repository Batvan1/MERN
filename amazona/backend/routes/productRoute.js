import express from 'express'
import Product from '../models/productModel.js'

const productRouter = express.Router()

productRouter.get('/', async (req,res)=>{
    const product = await Product.find()
    res.send(product)
})


// aşağıdaki router search screen sayfasından gelen istekleri karşşılar ve incele
const PAGE_SIZE = 3

productRouter.get('/search', async (req,res)=>{
    console.log('search screen api çalıştı')
    const {query} = req

    const pageSize = query.pageSize || PAGE_SIZE 
    const page = query.page || 1
    const category = query.category || ''
    const brand = query.brand || ''
    const price = query.price || ''
    const rating = query.rating || ''
    const order = query.order || ''
    const searchQuery = query.searchQuery || ''

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        name: {
            $regex: searchQuery,
            $options: 'i',
        },
    } : {}

    const categoryFilter = category && category !== 'all' ? {category} : {}

    const ratingFilter = rating && rating !== 'all' ? {
        rating:{
            $gte: Number(rating)
        }
    } : {}


    const priceFilter = price && price !== 'all' ? {
        price: { //1-50
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1])
        }
    } : {}


    // aşağıdaki kodu incele
    const sortOrder = 
    order === 'featured' 
    ? {featured: -1}
    : order === 'lowest'
    ? {price: 1} 
    : order === 'highest'
    ? {price: -1}
    : order === 'toprated'
    ? {rating: -1}
    : order === 'newest'
    ? {createdAt: -1}
    : {_id: -1}


   const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter
   })
   .sort(sortOrder)
   .skip(pageSize * (page - 1))
   .limit(pageSize)

   const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter
   })



   res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize)
    
   })
})
// serch screen istek karşılama apı son





productRouter.get('/categories',async (req,res)=>{
    const categories = await Product.find().distinct('category')
    console.log(categories)
    res.send(categories)
})


productRouter.get('/slug/:slug',async (req,res)=>{
    const product = await Product.findOne({ slug: req.params.slug }) //burada kullanıcı tarafından gelen istek bizde statik olarak duran data.js verisi ile eşleşip karşıya obje döndürüyoruz tek bir key değeri eşlemesidnen
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
    
})

productRouter.get('/:id', async(req,res)=>{
    const product = await Product.findById(req.params.id)  //burada kullanıcı tarafından gelen istek bizde statik olarak duran data.js verisi ile eşleşip karşıya obje döndürüyoruz tek bir key değeri eşlemesidnen
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
    
})


export default productRouter