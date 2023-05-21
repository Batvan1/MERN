import express from 'express'
import { generateToken, isAuth } from '../utils.js'
import expressAsyncHandler from 'express-async-handler'
import Iyzipay from 'iyzipay'
import Order from '../models/orderModel.js'

import { v4 as uuidv4 } from 'uuid';


const orderRouter = express.Router()

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({

        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })), // ...x ile mevcut objeyi açıyor içerisine product key'i ile beraber normal objermizin id'sini product key'inede veriyor

        shippingAddress: req.body.shippingAddress,

        paymentMethod: req.body.paymentMethod,

        itemsPrice: req.body.itemsPrice,

        shippingPrice: req.body.shippingPrice,

        taxPrice: req.body.taxPrice,

        totalPrice: req.body.totalPrice,

        user: req.user._id, // bu farklı bunu incele
    })

    const order = await newOrder.save()



    res.status(201).send({ message: 'New Order Created', order })
}))



orderRouter.get('/mine',isAuth, async (req, res)=> { // req.user isAuth fonksiyonunda decode edilmiş token

    const orders = await Order.find({user: req.user._id})

    res.send(orders)
})



orderRouter.post('/payment', async (req, res) => {

    const id = uuidv4()


    const iyzipay = new Iyzipay({
        apiKey: process.env.IYZIPAY_API_KEY,
        secretKey: process.env.IYZIPAY_SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com'
    });

    const { totalItemsPrice, cartUserName, cartNumber, cvc, expireMonthYear, fullName, city, country, address, postalCode, items } = req.body

    const data = {
        locale: "tr",
        conversationId: id,
        price: totalItemsPrice,
        paidPrice: totalItemsPrice,
        currency: "TRY",
        installment: '1',
        basketId: 'B67832',
        paymentChannel: "WEB",
        paymentGroup: "PRODUCT",
        paymentCard: {
            cardHolderName: cartUserName,
            cardNumber: cartNumber,
            expireMonth: expireMonthYear.split("/")[0],
            expireYear: expireMonthYear.split("/")[1],
            cvc: cvc,
            registerCard: '0'
        },
        buyer: {
            id: 'BY789',
            name: fullName,
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: fullName,
            city: city,
            country: country,
            address: address,
            zipCode: postalCode
        },
        billingAddress: {
            contactName: fullName,
            city: city,
            country: country,
            address: address,
            zipCode: postalCode
        },
        basketItems: items.map(x => (
            {
                id: x._id,
                name: x.name,
                category1: x.slug,
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: x.price * x.quantity
            }
        ))


    };

    console.log(data.basketItems)

    return new Promise(async (resolve, reject) => {

        await iyzipay.payment.create(data, function (err, result) {

            if (err) return reject(err)

            console.log(err, result)



            if (result.status !== 'success') {
                reject(res.send("result.status key'inin değeri success'e eşit değil"))
            }



            resolve(res.send(result))


        });

    })
})




orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    console.log(":id dediğimiz yer çalıştı orderda")
    const order = await Order.findById(req.params.id)

    if (order) {
        res.send(order)
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }

}))



orderRouter.get('/ben/:id', async (req, res) => {

    console.log("/ben/:id ksımı çalıştı")
    const order = await Order.findById(req.params.id)



    if (order) {
        res.send(order)
    } else {
        res.status(404).send({ message: "Order Not Found" })
    }
})



export default orderRouter