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


                <div className="order-container">

                    <div className="order-1">

                        <div className="order-div">

                            <h3 className="order-h3">Shipping</h3>

                            <strong className="order-stg">Name:</strong> <span className="order-span">{order.shippingAddress.fullName} </span><br />
                            <strong className="order-stg">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country}

                            <div className="textt">

                                {order.isDelivered ? (
                                    <span className="not-f">Delivered at {order.deliveredAt}</span>
                                ) :

                                    <span className="not">Not Delivered</span>

                                }

                            </div>
                        </div>


                        <div className="order-div">
                            <h3 className="order-h3">Payment</h3>

                            <div>
                                <strong className="order-stg">Method: </strong> <span className="order-span">{order.paymentMethod} </span><br />

                                {order.isPaid ? (
                                    <span className="not-f">Paid At {order.paidAt}</span>
                                ) :
                                    <span className="not">Not Paid</span>
                                }
                            </div>

                        </div>



                        <div className="order-div">
                            <h3 className="order-h3">ITEMS</h3>

                            <div>
                                {order.orderItems.map((item) => {
                                    return <div key={item._id} className="order-items">

                                        <div className="order-imgLink">
                                            <img src={item.image} alt={item.name} className="order-img"></img> {' '}

                                            <Link to={`/product/${item.slug}`} className="order-link">{item.name}</Link>
                                        </div>


                                        <span className="order-span">{item.quantity}</span>

                                        <span className="order-span">${item.price}</span>

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>



                    <div className="order-2">
                        <h3 className="order-h3">Order Sumarry</h3>


                        <div className="order2-div">
                            <h4>Items</h4>
                            <span>${order.itemsPrice.toFixed(2)}</span>
                        </div>


                        <div className="order2-div">
                            <h4>Shipping</h4>
                            <span>${order.shippingPrice.toFixed(2)}</span>
                        </div>


                        <div className="order2-div">
                            <h4>Tax</h4>
                            <span>${order.taxPrice.toFixed(2)}</span>
                        </div>

                        <div className="order2-div">
                            <h4>Order Total</h4>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>


                        <div className="order-btn-divv">
                            <button onClick={orderSubmitHandler} className="order-btnn">Ödemeyi tamamla</button>
                        </div>
                    </div>


                </div>



            </div>

    )
}