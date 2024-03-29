import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";

export default function SigninScreen(){



    const navigate = useNavigate()

    const {search} = useLocation()
    const redirectInURL = new URLSearchParams(search).get('redirect') // /shipping or /  === alt satırda
    const redirect = redirectInURL ? redirectInURL : '/'


    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const {state , dispatch: ctxDispatch} = useContext(Store)

    const {userInfo} = state

    const submitHandler = async (e)=>{
        e.preventDefault()

        try {

            const {data} = await axios.post('/api/users/signin', { email, password })

            ctxDispatch({type: 'USER_SIGNIN', payload: data})

            localStorage.setItem('userInfo', JSON.stringify(data))

            navigate(redirect || '/')

        } catch (error) {
            alert('Şifreniz veya kullanıcı adınız hatalı')
        }

    }
    //incele
    // bu kod ile kullanıcı sayfasına girdiğinde ve tekrar signin isteği attığında tekrar giriş yapmamasını sağlayacak
    useEffect(()=>{

        if(userInfo){
            navigate(redirect)
        }

    },[navigate, redirect, userInfo])
    // bu kod ile son


    return(
        <div className="signin-container">
            <Helmet>
            <title>Giriş yap</title>
            </Helmet>
           

            <h1 className="sign-in-h1">Giriş Yap</h1>

            <form onSubmit={submitHandler} className="signin-form">
                <label className="signin-label" htmlFor="email">Email</label>
                <input className="signin-input" type="email" id="email" required  onChange={(e)=> setEmail(e.target.value) }></input>

                <label className="signin-label" htmlFor="password">Password</label>
                <input className="signin-input" type="password" id="password" required  onChange={(e)=> setPassword(e.target.value)}></input>

                <div>
                    <button type="submit" className="signin-btn">Sign in</button>
                </div>

                <div className="signin-link-div">
                   <p> Yeni misiniz ?</p>
                    <Link to={`/signup?redirect=${redirect}`} className="signin-link">30 Saniyede Hesabını Oluştur.</Link>
                </div>
            </form>
        </div>
    )
}