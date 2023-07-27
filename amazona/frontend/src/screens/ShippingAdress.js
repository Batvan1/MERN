import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";


export default function ShippingAdressScreen() {

    const {state, dispatch: ctxDispatch} = useContext(Store)

    const {userInfo, cart: {shippingAddress}} = state

    const navigate = useNavigate()


    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

// incele
// userInfo yoksa signin isteği atıp o isteği karşılayan route'ye gidecez
    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    },[userInfo, navigate])
// son


    const submitHandler = (e) => {

        e.preventDefault()

        ctxDispatch({type: 'SAVE_SHIPPING_ADDRESS', payload:{fullName, address, city, postalCode, country} })

        localStorage.setItem('shippingAddress', JSON.stringify({fullName, address, city, postalCode, country}))

        navigate('/payment')
    }


    return (
        <div>
            <Helmet>
            <title>Shipping Adress</title>
            </Helmet>

            <h1>Kargo Adresi</h1>

            <form onSubmit={submitHandler} className="shipping-form">

                <div className="shipping-div">
                    <label htmlFor="fullName" className="shipping-label">Ad , Soyad</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>

                <div className="shipping-div">
                    <label htmlFor="address" className="shipping-label">Adres</label>
                    <input type="text" id="address" value={address} onChange={(e)=> setAddress(e.target.value)} required></input>
                </div>

                <div className="shipping-div">
                    <label htmlFor="city" className="shipping-label">Şehir</label>
                    <input type="text" id="city" value={city} onChange={(e)=> setCity(e.target.value)} required></input>
                </div>

                <div className="shipping-div">
                    <label htmlFor="postalCode" className="shipping-label">Posta Kodu</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} required></input>
                </div>

                <div className="shipping-div">
                    <label htmlFor="country" className="shipping-label">Ülke</label>
                    <input type="text" id="country" value={country} onChange={(e)=> setCountry(e.target.value)} required></input>
                </div>

                <div>
                    <button type="submit" className="shipping-btn">Devam Et</button>
                </div>

            </form>
        </div>
    )
}