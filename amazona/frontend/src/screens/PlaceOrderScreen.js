import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils.js";



const reducer = (state, action) => {

    switch (action.type) {

        case 'CREATE_REQUEST': {
            return { ...state, loading: true }
        }

        case 'CREATE_SUCCESS': {
            return { ...state, loading: false }
        }

        case 'CREATE_FAIL': {
            return { ...state, loading: false }
        }

        default: {
            return { state }
        }
    }

}



export default function PlaceOrderScreen() {

    const navigate = useNavigate()


    const [{ loading }, dispatch] = useReducer(reducer, { loading: false, })


    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { cart, userInfo } = state



    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100 // fonksiyon oluşturuldu
 // burada cart objesinin (react state diyor) içerisinde yeni key oluşturuyoruz aslında
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)) //görünen 4 yerde kullanıldı func

    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)

    cart.taxPrice = round2(0.15 * cart.itemsPrice)

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice




    const placeOrderHandler = async () => {
        try {

            dispatch({ type: 'CREATE_REQUEST' })

            const { data } = await axios.post('/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                }
            )


            ctxDispatch({ type: 'CART_CLEAR' })

            dispatch({ type: 'CREATE_SUCCESS' })

            localStorage.removeItem('cartItems')

            navigate(`/order/${data.order._id}`)


        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' })
            alert(getError(err))
        }
    }


    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart, navigate])

    return (
        <div>

            <Helmet><title>Preview Order</title></Helmet>

            <h1 className="shipping-h1">Sipariş Özet</h1>

            <div className="place-full-com">
                <div className="place-div1">
                    <div className="mini-container">

                        <h3 className="place-mini-h">Kargo Alıcısı</h3>

                        <div className="mini-body">

                            <div className="mini-txt">
                                <strong className="place-stg">İsim: <span className="place-span">{cart.shippingAddress.fullName}</span> </strong> 
                                <strong className="place-stg">Adres:  <span className="place-span"> {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country} </span></strong>
                            </div>
                            <Link to="/shipping" className="place-edit">Edit</Link>
                        </div>
                    </div>


                    <div className="mini-container">

                        <h3 className="place-mini-h">Ödeme Yöntemi</h3>

                        <div className="mini-body">

                            <div className="mini-txt">
                                <strong className="place-stg">Metod: <span className="place-span">{cart.paymentMethod}</span> </strong> 

                            </div>
                            <Link to="/payment" className="place-edit">Edit</Link>
                        </div>
                    </div>


                    <div className="mini-container">

                        <h3 className="place-mini-h">Ürünler</h3>

                        <div>
                            {cart.cartItems.map((item) => (

                                <div key={item._id} className="mini-body">
                                    <img src={item.image} alt={item.name} className="place-order-image"></img>

                                    <Link to={`/product/${item.slug}`} className="place-name-link">{item.name}</Link> 

                                    <div className="placeorder-quantityAndPrice">
                                        <strong className="place-stg">Adet: <span className="place-span">{item.quantity}</span></strong> 
                                        <strong className="place-stg">Fiyat: <span className="place-span">{item.price} TL</span></strong> 
                                    </div>

                                </div>

                            ))}
                        </div>
                        <div className="edit-div2">
                        <Link to="/cart" className="place-edit2">Edit</Link>
                        </div>
                    </div>
                </div>


                <div className="place-details">
                    <h3 className="place-right-white-h3">Sipariş Özeti</h3>

                    <div className="place-yy-div">
                        <div className="place-right-white">Ürünler:</div>
                        <div className="place-right-orange">{cart.itemsPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <div className="place-right-white">Kargo:</div>
                        <div className="place-right-orange">{cart.shippingPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <div className="place-right-white">Vergi:</div>
                        <div className="place-right-orange">{cart.taxPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <strong className="place-right-white">Sipariş Toplamı:</strong>
                        <strong className="place-right-orange">{cart.totalPrice.toFixed(2)} TL</strong>
                    </div>


                    <div className="place-right-button">
                        <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} className="place-button">Siparişi Ver</button>
                    </div>

                               
                    

                </div>
            </div>

        </div>
    )
}