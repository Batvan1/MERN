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

            <h1>Sipariş Özet</h1>

            <div className="place-full-com">
                <div className="place-div1">
                    <div className="mini-container">

                        <h3 className="place-mini-h">Kargo Alıcısı</h3>

                        <div className="mini-body">

                            <div className="mini-txt">
                                <strong className="place-stg">İsim: </strong> <span className="place-span">{cart.shippingAddress.fullName}</span> <br />
                                <strong className="place-stg">Adres: </strong> <span className="place-span"> {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country} </span>
                            </div>
                            <Link to="/shipping" className="place-edit">Edit</Link>
                        </div>
                    </div>


                    <div className="mini-container">

                        <h3 className="place-mini-h">Ödeme Yöntemi</h3>

                        <div className="mini-body">

                            <div className="mini-txt">
                                <strong className="place-stg">Metod:</strong> <span className="place-span">{cart.paymentMethod}</span> <br />

                            </div>
                            <Link to="/payment" className="place-edit">Edit</Link>
                        </div>
                    </div>


                    <div className="mini-container">

                        <h3 className="place-mini-h">Ürünler</h3>

                        <div className="mini-body">
                            {cart.cartItems.map((item) => (

                                <div key={item._id}>
                                    <img src={item.image} alt={item.name} className="place-order-image"></img>

                                    <Link to={`/product/${item.slug}`} className="place-name-link">{item.name}</Link> <br/>

                                        <strong className="place-stg">Adet: </strong> <span className="place-span">{item.quantity}</span> <br/>
                                        <strong className="place-stg">Fiyat: </strong> <span className="place-span">{item.price}</span>
                                </div>

                            ))}
                        </div>
                        <Link to="/cart" className="place-edit">Edit</Link>
                    </div>
                </div>


                <div className="place-details">
                    <h3>Sipariş Özeti</h3>

                    <div className="place-yy-div">
                        <div>Ürünler</div>
                        <div>{cart.itemsPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <div>Kargo</div>
                        <div>{cart.shippingPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <div>Vergi</div>
                        <div>{cart.taxPrice.toFixed(2)} TL</div>
                    </div>

                    <div className="place-yy-div">
                        <strong>Sipariş Toplamı</strong>
                        <strong>{cart.totalPrice.toFixed(2)} TL</strong>
                    </div>


                    <div className="place-right-button">
                        <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Siparişi Ver</button>
                    </div>

                               
                    

                </div>
            </div>

        </div>
    )
}