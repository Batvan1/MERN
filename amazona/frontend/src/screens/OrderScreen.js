import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }

        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }

        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}



export default function OrderScreen() {

    const dOrderId = useLocation().pathname.split("/")[2] // useParams ilede aynı hesaba geliyor

    const navigate = useNavigate()


    const { state } = useContext(Store) // ayrı klasörde oluşturduğumuz useReducer yapısı
    const { userInfo } = state // ayrı klasörde oluşturulan useReducer ın statain içerisinden userInfo 


    const [{ loading, error, order }, dispatch] = useReducer(reducer, {

        loading: true,
        order: {},
        error: ''

    })

    const params = useParams()

    const { id: orderId } = params




    useEffect(() => {

        const fetchOrder = async () => {

            try {

                dispatch({ type: 'FETCH_REQUEST' })

                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })

                dispatch({ type: 'FETCH_SUCCESS', payload: data })

            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }

        if (!userInfo) {
            return navigate('/login')
        }

        if (!order._id || (order._id && order._id !== orderId)) {

            fetchOrder()

        }
    }, [order, userInfo, orderId, navigate])





    const orderSubmitHandler = async () => {

        console.log("orderdaki son buton active")

        navigate(`/sonAdim/${dOrderId}`)

    }


    return (
        loading ? <h1>Loading</h1> : error ? <div>Şimdilik Hatalı İşlem</div> :

            <div>
                <Helmet>
                    <title>Order {orderId}</title>
                </Helmet>

                <h1 className="my-3"> Order {orderId}</h1>



                <div>
                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Navigate:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}

                    <div className="textt">

                        {order.isDelivered ? (
                            <span>Delivered at {order.deliveredAd}</span>
                        ) :

                            <span>Not Delivered</span>

                        }

                    </div>
                </div>


                <div>
                    <h3>Payment</h3>

                    <div>
                        <strong>Method: </strong> {order.paymentMethod} <br />

                        {order.isPaid ? (
                            <span>Paid At {order.paidAt}</span>
                        ) :
                            <span>Not Paid</span>
                        }
                    </div>

                </div>



                <div>
                    <h3>ITEMS</h3>

                    <div>
                        {order.orderItems.map((item) => {
                            return <div key={item._id}>

                                <img src={item.image} alt={item.name} className="img-li"></img> {' '}

                                <Link to={`/product/${item.slug}`}>{item.name}</Link>

                                <div>
                                    <span>{item.quantity}</span>
                                </div>

                                <div>
                                    <span>{item.price}</span>
                                </div>

                            </div>
                        })}
                    </div>
                </div>



                <div>
                    <h3>Order Sumarry</h3>


                    <div>
                        <span>Items</span>
                        <span>${order.itemsPrice.toFixed(2)}</span>
                    </div>


                    <div>
                        <span>Shipping</span>
                        <span>${order.shippingPrice.toFixed(2)}</span>
                    </div>


                    <div>
                        <span>Tax</span>
                        <span>${order.taxPrice.toFixed(2)}</span>
                    </div>

                    <div>
                        <span>Order Total</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                    </div>

                </div>


                <div>
                    <button onClick={orderSubmitHandler}>Ödemeyi tamamla</button>
                </div>

            </div>

    )
}