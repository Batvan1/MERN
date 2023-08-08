import bcrypt from 'bcryptjs'

const data = {
    users:[
        {
            name: "Batuhano",
            email: "krayyark9@gmail.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },

        {
            name: "reşat",
            email: "yeni@gmail.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],

    products:[
        {
            //_id: "1",
            name: "tanju okan",
            slug: "nike-slim-shirt",
            category: "shirts-1",
            image: "/images/tanu.jpg",
            price: 200,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "2",
            name: "erkin koray",
            slug: "adidas-wow",
            category: "shirts-2",
            image: "/images/erkin.jpg",
            price: 300,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "3",
            name: "ibrahim tatlıses",
            slug: "puma-my-got",
            category: "shirts-3",
            image: "/images/ibo.jpg",
            price: 55,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "4",
            name: "müslüm gürses",
            slug: "beymen",
            category: "shirts-4",
            image: "/images/muslum.jpg",
            price: 50,
            countInStock: 0,
            brand: "nike",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "5",
            name: "sezen aksu",
            slug: "beasymen",
            category: "shirsats-4",
            image: "/images/sezen.jpeg",
            price: 700,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "6",
            name: "kazancı bedih",
            slug: "kazan",
            category: "shirsats-4",
            image: "/images/kazanci.jpg",
            price: 600,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Kaset"
        },
        {
            //_id: "7",
            name: "yuhu - ölüme çare yok --kaset--",
            slug: "yuhu-ölümeÇareYok",
            category: "kaset",
            image: "/images/yuhu.jpg",
            price: 1100,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Özel ve az bulunan bir kaset"
        },
        {
            //_id: "8",
            name: "red - 50/50 --kaset--",
            slug: "red-50/50--kaset--",
            category: "kaset",
            image: "/images/redd50.jpg",
            price: 1100,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Üretimi yok"
        },
        {
            //_id: "9",
            name: "şebnen ferah - perdeler --kaset--",
            slug: "şebnenFerah-perdeler--kaset--",
            category: "kaset",
            image: "/images/sebnen-Perdeler.jpg",
            price: 370,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Nadir ve temiz bir ürün"
        },
        {
            //_id: "10",
            name: "şebnen ferah - benim adım orman --kaset--",
            slug: "şebnenFerah-benimAdımOrman--kaset--",
            category: "kaset",
            image: "/images/sebnenBenimAdimOrman.jpg",
            price: 2000,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Orjinal ve kalite"
        },
        {
            //_id: "11",
            name: "mavi sakal - iki yol --kaset--",
            slug: "maviSakal-ikiYol--kaset--",
            category: "kaset",
            image: "/images/mavisakal-2yol.jpg",
            price: 180,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Eşsiz bir ürün"
        },
        {
            //_id: "12",
            name: "mavi sakal - 2 --kaset--",
            slug: "maviSakal-2--kaset--",
            category: "kaset",
            image: "/images/mavisakal-2-.jpg",
            price: 430,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Eşsiz bir ürün"
        },
        {
            //_id: "13",
            name: "müslüm gürses - unutulmayanlar-1 --kaset--",
            slug: "müslümGürses-unutulmayanlar-1",
            category: "kaset",
            image: "/images/muslumUnutulmayanlar.jpg",
            price: 400,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Eşsiz bir ürün"
        },
        {
            //_id: "14",
            name: "müslüm gürses - anlatamadım --kaset--",
            slug: "müslümGürses-anlatamadım-1",
            category: "kaset",
            image: "/images/muslumAnlatamadim.jpg",
            price: 800,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Uzelli kaset inanılmaz zor bulunur"
        },
        {
            //_id: "15",
            name: "şiwan perwer - ya star --kaset--",
            slug: "şiwanPerwer-yaStar",
            category: "kaset",
            image: "/images/siwanperwer-yaStar.jpg",
            price: 270,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Nadir bulunan kürtçe kaset"
        },
        {
            //_id: "16",
            name: "zeki müren - bir yaz yağmuru --kaset--",
            slug: "zekiMüren-bir yaz yağmuru",
            category: "kaset",
            image: "/images/zekiMuran-YazYagmuru.jpg",
            price: 4100,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Çok özel dönem baskısı plak"
        },
        {
            //_id: "17",
            name: "neşet ertaş - ölmeyen türküler-3 --kaset--",
            slug: "neşetErtaş-ölmeyenTürküler-3",
            category: "kaset",
            image: "/images/nesetErtasOlmeyenTurkuler.jpg",
            price: 430,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Çok özel dönem baskısı plak"
        },
        {
            //_id: "18",
            name: "şebnen ferah - kelimeler yetersiz --kaset--",
            slug: "şebnenFerah-kelimelerYetersiz",
            category: "kaset",
            image: "/images/sebnenKelimelerYetersiz.jpg",
            price: 430,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Çok özel dönem baskısı kaset"
        },
        {
            //_id: "19",
            name: "şebnen ferah - can kırıkları --kaset--",
            slug: "şebnenFerah-canKırıkları",
            category: "kaset",
            image: "/images/sebnenferah-canKiriklari.jpg",
            price: 230,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Çok özel dönem baskısı kaset"
        },
        {
            //_id: "19",
            name: "ciwan haco - nisebina rengin --kaset--",
            slug: "ciwanHaco-nisebinaRengin",
            category: "kaset",
            image: "/images/ciwabHacoNesibeEngin.jpg",
            price: 520,
            countInStock: 1,
            brand: "nikse",
            rating: 4.5,
            numReviews: 10,
            description: "Çok özel dönem baskısı kaset"
        },
    ]
}

export default data