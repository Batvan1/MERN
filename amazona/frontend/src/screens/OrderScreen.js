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
    console.log(process.env.PUBLIC_URL)

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

                <h1 className="my-3"> Sipariş {orderId}</h1>


                <div className="order-container">

                    <div className="order-1">

                        <div className="order-div">

                            <h3 className="order-h3">Kargo</h3>

                            <strong className="order-stg">İsim: <span className="order-span">{order.shippingAddress.fullName} </span></strong> 
                            <strong className="order-stg">Adres:  <span className="order-span">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{order.shippingAddress.country}</span></strong>
                            
                            <div className="textt">

                                {order.isDelivered ? (
                                    <span className="not-f">Teslim Edildi {order.deliveredAt}</span>
                                ) :

                                    <span className="not">Teslim Edilmedi</span>

                                }

                            </div>
                        </div>


                        <div className="order-div">
                            <h3 className="order-h3">Ödeme Yöntemi</h3>

                            <div>
                                <strong className="order-stg">Metod: </strong> <span className="order-span">{order.paymentMethod} </span><br />

                                {order.isPaid ? (
                                    <span className="not-f">Ödendi {order.paidAt}</span>
                                ) :
                                    <span className="not">Ödenmedi</span>
                                }
                            </div>

                        </div>



                        <div className="order-div">
                            <h3 className="order-h3">Ürünler</h3>

                            <div>
                                {order.orderItems.map((item) => {
                                    return <div key={item._id} className="order-items">

                                        
                                            <img src={item.image} alt={item.name} className="order-img"></img> {' '}

                                            <Link to={`/product/${item.slug}`} className="order-link">{item.name}</Link>
                                        

                                        <div className="orderQuantityAndPrice">
                                            <strong className="order-stg">Adet: <span className="order-span">{item.quantity}</span></strong>

                                            <strong className="order-stg">Fiyat: <span className="order-span">{item.price} TL</span></strong>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>



                    <div className="order-2">
                        <h3 className="order-h3">Sipariş Özeti</h3>


                        <div className="order2-div">
                            <h4>Ürünler:</h4>
                            <span>{order.itemsPrice.toFixed(2)} TL</span>
                        </div>


                        <div className="order2-div">
                            <h4>Kargo:</h4>
                            <span>{order.shippingPrice.toFixed(2)} TL</span>
                        </div>


                        <div className="order2-div">
                            <h4>Vergi:</h4>
                            <span>{order.taxPrice.toFixed(2)} TL</span>
                        </div>

                        <div className="order2-div">
                            <h4>Sipariş Toplamı:</h4>
                            <span>{order.totalPrice.toFixed(2)} TL</span>
                        </div>


                        <div className="order-btn-divv">
                            <button onClick={orderSubmitHandler} className="order-btnn">Ödemeyi Tamamla</button>
                        </div>
                    </div>







                </div>



            </div>

    )
}