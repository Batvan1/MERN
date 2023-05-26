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


                ctxDispatch({type: 'CART_CLEAR'})

                dispatch({type: 'CREATE_SUCCESS'})

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

            <h1>Preview Order</h1>

            <div className="mini-container">

                <h3>Shipping</h3>

                <div className="mini-body">

                    <div className="mini-txt">
                        <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                        <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </div>
                    <Link to="/shipping">Edit</Link>
                </div>
            </div>


            <div className="mini-container">

                <h3>Payment</h3>

                <div className="mini-body">

                    <div className="mini-txt">
                        <strong>Method:</strong> {cart.paymentMethod} <br />

                    </div>
                    <Link to="/payment">Edit</Link>
                </div>
            </div>


            <div className="mini-container">

                <h3>Items</h3>

                <div className="mini-body">
                    {cart.cartItems.map((item) => (

                        <div key={item._id}>
                            <img src={item.image} alt={item.name} className="place-order-image"></img>

                            <Link to={`/product/${item.slug}`}>{item.name}</Link>

                            <div><span>Piece: {item.quantity}</span></div>
                            <div>Price: {item.price}</div>
                        </div>

                    ))}
                </div>
                <Link to="/cart">Edit</Link>
            </div>



            <div>
                <h3>Order Summary</h3>

                <div>
                    <div>Items</div>
                    <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>

                <div>
                    <div>Shipping</div>
                    <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>

                <div>
                    <div>Tax</div>
                    <div>${cart.taxPrice.toFixed(2)}</div>
                </div>

                <div>
                    <strong>Order Total</strong>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                </div>


                <div>
                    <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                </div>

                {loading}

            </div>

        </div>
    )
}