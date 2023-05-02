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
            name: "Nike Slim shirt",
            slug: "nike-slim-shirt",
            category: "shirts",
            image: "/images/p1.jpg",
            price: 200,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numRevievs: 10,
            description: "high quality shirt"
        },
        {
            //_id: "2",
            name: "falaca o",
            slug: "adidas-wow",
            category: "shirts",
            image: "/images/p2.jpg",
            price: 300,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numRevievs: 10,
            description: "high quality shirt"
        },
        {
            //_id: "3",
            name: "ortanca oo",
            slug: "puma-my-got",
            category: "shirts",
            image: "/images/p3.jpg",
            price: 188,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numRevievs: 10,
            description: "high quality shirt"
        },
        {
            //_id: "4",
            name: "büyük oooo",
            slug: "beymen",
            category: "shirts",
            image: "/images/p4.jpg",
            price: 700,
            countInStock: 0,
            brand: "nike",
            rating: 4.5,
            numRevievs: 10,
            description: "high quality shirt"
        }
    ]
}

export default data