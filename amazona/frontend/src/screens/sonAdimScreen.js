import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../Store";




const reducer = (state, action)=>{
    switch(action.type){
        case 'ORDER_SUCCESS':{
            return {...state, dbOrder: action.payload}
        }

        default: {
            return state
        }
    }
}






export default function SonAdimScreen(){

    const {dOId} = useParams()


    const {state} = useContext(Store) // ayrı klasörde oluşturduğumuz useReducer yapısı

        console.log(state)


    // react'tan gelen useReducer yapısı oluşturuldu
    const [{dbOrder}, dispatch] = useReducer(reducer, {dbOrder: {}})




    // useState yapıları oluşturuldu react'ta olan 
    const [cartUserName, setCartUserName] = useState()
    const [cartNumber, setCartNumber] = useState()
    const [expireMonthYear, setExpireMonthYear] = useState()
    const [cvc, setCvc] = useState()
    // use state yapıları son 


    console.log(dbOrder)

    useEffect(()=>{
        const fetchOrder = async ()=>{
            try {
                const {data} = await axios.get(`/api/orders/ben/${dOId}`)

                dispatch({type: 'ORDER_SUCCESS', payload: data}) // useReducer yapısının tetikleyicisi

             
            } catch (error) {
                alert("bir hata oluştu")
            }
        }

        fetchOrder()
    },[dOId])

    

    // iyzicoya gönderilecek önemli veriler. sayfadaki butona basınca aktifleşecek sayemizde

    const end = ()=>{
        try {
            axios.post('/api/orders/payment',{
                totalItemsPrice: dbOrder.itemsPrice,
                endTotalPrice: dbOrder.totalPrice,

                cartUserName: cartUserName,
                cartNumber: cartNumber,
                expireMonthYear: expireMonthYear,
                cvc: cvc,
                
                id: state.userInfo._id,
                email: state.userInfo.email,

                fullName: dbOrder.shippingAddress.fullName,
                city: dbOrder.shippingAddress.city,
                country: dbOrder.shippingAddress.country,
                address: dbOrder.shippingAddress.address,
                postalCode: dbOrder.shippingAddress.postalCode,

                items: dbOrder.orderItems



            })
        } catch (error) {
            alert(error)
        }
    }






    return(
        <div className="son-container">
            <div className="son-div">

            <label className="son-label" htmlFor="cart-user">Cart User Name</label>
            <input className="son-input" type="text" id="cart-user" onChange={(e)=> setCartUserName(e.target.value)}></input>

            </div>

            <div className="son-div">

            <label className="son-label" htmlFor="cart-number">Cart Number</label>
            <input className="son-input" type="text" id="cart-number" onChange={(e)=> setCartNumber(e.target.value)}></input>

            </div>

            <div className="son-div">

            <label className="son-label" htmlFor="cart-expire">Cart Expire Month Year</label>
            <input className="son-input" type="text" id="cart-expire" onChange={(e)=> setExpireMonthYear(e.target.value)}></input>

            </div>

            <div className="son-div">

            <label className="son-label" htmlFor="cart-cvc">Cart Cvc</label>
            <input className="son-input" type="text" id="cart-cvc" onChange={(e)=> setCvc(e.target.value)}></input>

            </div>

            <button className="son-btn" onClick={end}>Güvenle öde</button>
        </div>
    )
}