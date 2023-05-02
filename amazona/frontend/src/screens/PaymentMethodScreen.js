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

        localStorage.setItem('paymentMethod', paymentMethodName)

        navigate('/placeorder')
    }


    return (
        <div>
            <Helmet><title>Payment Method</title></Helmet>

            <h1>Payment Method</h1>

            <form onSubmit={submitHandler}>

                <div>
                    <label htmlFor="iyzico">Iyzico</label>
                    <input type="radio" id="iyzico" value="iyzico" checked={paymentMethodName === "iyzico"} onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor="papara">Papara</label>
                    <input type="radio" id="papara" value="papara" checked={paymentMethodName === "papara"} onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                </div>

                <div>
                    <button type="submit">Continue</button>
                </div>

            </form>
        </div>
    )
}