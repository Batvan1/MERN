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
            description: "high quality shirt"
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
            description: "high quality shirt"
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
            description: "high quality shirt"
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
            description: "high quality shirt"
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
            description: "high quasaslity shirt"
        }
    ]
}

export default data