import express from 'express'
import Product from '../models/productModel.js'
import path from 'path'
import multer from 'multer'


const productRouter = express.Router()

// multer start
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(path.resolve(),'../frontend/public/images') // resmin kaydedieceği yer (muTter m0düIü
        console.log(uploadPath)
        return cb(null,uploadPath)
    },

    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`) // d0sya adı beIirIenen yer (muTter m0düIü
    }
})

const upload = multer({storage: Storage}).single('image') // resmin tek şekide gönderieceğini ve image fieId'ına sahip etiketi aIıcağını beIirtiyoruz
// multer end



productRouter.post('/hakan',upload, async (req, res) => {

    try {
       console.log(req.file)
        const { brand, slug, name, category, description, price, rating, numReviews, countInStock } = req.body

        const productSave = new Product({
            name: name,
            slug: slug,
            image: `/images/${req.file.filename}`,
            brand: brand,
            category: category,
            description: description,
            price: price,
            rating: rating,
            numReviews: numReviews,
            countInStock: countInStock,
        })

        const save = await productSave.save()

        console.log(save)

        res.status(201).json({ message: "işlem başarılı" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Ürünü yükleyemediniz sayın yarram" })
    }
})



productRouter.get('/', async (req, res) => {

    try {
        const product = await Product.find() // dizi içerisinde objeler getiriyorum bu mongosee metodu sayesinde
        res.send(product)
    } catch (error) {
        console.log(`anasayfa istek hatası sunucu tarafı ${error}`)
        res.status(500).send({ message: "veritabanı hatası olduuuuuuu" })
    }

})



// aşağıdaki router search screen sayfasından gelen istekleri karşşılar ve incele
const PAGE_SIZE = 3

productRouter.get('/search', async (req, res) => {
    console.log('search screen api çalıştı')
    // req.query express'te önceden tanımlanmış obje içerisinde karşıdan gelen istek parametre ve değeri var
    const { query } = req

    console.log(req.query)

    const pageSize = query.pageSize || PAGE_SIZE
    const page = query.page || 1
    const category = query.category || ''
    const brand = query.brand || ''
    const price = query.price || ''
    const rating = query.rating || ''
    const order = query.order || ''
    const searchQuery = query.query || ''

    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        name: {
            $regex: searchQuery,
            $options: 'i',
        },
    } : {}

    const categoryFilter = category && category !== 'all' ? { category } : {}

    const ratingFilter = rating && rating !== 'all' ? {
        rating: {
            $gte: Number(rating)
        }
    } : {}


    const priceFilter = price && price !== 'all' ? {
        price: { //"1-50" string halde geliyor görünen şekilde split ile bölüp Number yerleşik objesi ile sayıya evrildi
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1])
        }
    } : {}


    // aşağıdaki kodu incele ..13.06.2023 kod anlaşıldı
    const sortOrder =
        order === 'featured'
            ? { featured: -1 }
            : order === 'lowest'
                ? { price: 1 }
                : order === 'highest'
                    ? { price: -1 }
                    : order === 'toprated'
                        ? { rating: -1 }
                        : order === 'newest'
                            ? { createdAt: -1 }
                            : { _id: -1 }

    console.log(queryFilter)
    console.log(ratingFilter)
    console.log(categoryFilter)
    console.log(priceFilter)

    const products = await Product.find({ // içi boşsa direk tüm belgeleri getiriyor (dizi içerisinde obje halinde)
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    })
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize)


    const countProducts = await Product.countDocuments({ //içi boşsa direk şemadaki belge sayısı getiriyor (NUmber halinde)

        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter

    })


    // {products: products,} bununla alttaki products, aynı diğerleri içinde geçerli tabiki bu kullanım 
    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize)

    })
})
// serch screen istek karşılama apı son





productRouter.get('/categories', async (req, res) => {
    const categories = await Product.find().distinct('category')

    res.send(categories)
})


productRouter.get('/slug/:slug', async (req, res) => {
    console.log("PRODUCT ROUTER SLUG/:SLUG İSTEĞİ KARŞILANDI")
    const product = await Product.findOne({ slug: req.params.slug }) //burada kullanıcı tarafından gelen istek bizde statik olarak duran data.js (dinamik mongo db) verisi ile eşleşip karşıya obje döndürüyoruz tek bir key değeri eşlemesinden
    if (product) {
        res.send(product)
        console.log("prodcut başarılı")
    } else {
        res.status(404).send({ message: 'Product not found' })
        console.log("prodcut olmadııııııı")
    }

})

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)  //burada kullanıcı tarafından gelen istek bizde statik olarak duran data.js verisi ile eşleşip karşıya obje döndürüyoruz tek bir key değeri eşlemesidnen
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }

})


export default productRouter