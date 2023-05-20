import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";


const reducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_REQUEST': {
            return { ...state, loading: true }
        }

        case 'FETCH_SUCCESS': {
            return { ...state, orders: action.paylaod, loading: false }
        }

        case 'FETCH_FAIL': {
            return { ...state, error: action.paylaod, loading: false }
        }

        default: {
            return state
        }
    }
}


export default function OrderHistoryScreen() {

    const { state } = useContext(Store)
    const { userInfo } = state



    const [{ loading, error, orders }, dispatch] = useReducer(reducer, { loading: true, error: "", })


    useEffect(() => {

        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST' })

            try {

                const { data } = await axios.get('/api/orders/mine', { headers: { Authorization: `Bearer ${userInfo.token}` } })

                dispatch({ type: 'FETCH_SUCCESS', paylaod: data })

            } catch (error) {

                dispatch({ type: 'FETCH_FAIL', paylaod: error })

            }
        }

        fetchData()


    }, [userInfo])


    return (
        <div>

                <Helmet>Order History</Helmet>

            <h1>Order History</h1>


            {loading ? <h1>Sayfa yükleniyor</h1> : error ? <h1>İstek sırasında hata</h1> : (

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAİD</th>
                            <th>DELIVERED</th>
                            <th>ACTİONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => {
                            return <tr key={order._id}>

                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.isPaid.substring(0, 10) : "No"}</td>
                                <td>{order.isDelivered ? order.isDelivered.substring(0, 10) : "No"}</td>

                                <td><button>Tablo butonu</button></td>

                            </tr>
                        })}
                    </tbody>
                </table>
            )}




        </div>

    )
}