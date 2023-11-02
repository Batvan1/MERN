import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {

    const navigate = useNavigate()

    const {state, dispatch: ctxDispatch} = useContext(Store)

    const { cart:{shippingAddress, paymentMethod} } = state

    
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'iyzico')
    

    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[shippingAddress, navigate])


    const submitHandler = (e)=>{
        
        e.preventDefault()

        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName})

        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName))

        navigate('/placeorder')
    }


    return (
        <div>
            <Helmet><title>Payment Method</title></Helmet>

            <h1 className="shipping-h1">Ödeme Yöntemi</h1>

            <form onSubmit={submitHandler} className="payment-form">

                <div className="payment-div">
                    <img className="payment-img"  src="/images/logo/iyzicoileOde.png" alt="iyzico"></img>
                    <input type="radio" id="iyzico" value="iyzico" checked={paymentMethodName === "iyzico"} onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                </div>


                <div>
                    <button type="submit" className="payment-btn">Continue</button>
                </div>

            </form>
        </div>
    )
}