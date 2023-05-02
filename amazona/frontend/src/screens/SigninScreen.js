import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";

export default function SigninScreen(){



    const navigate = useNavigate()

    const {search} = useLocation()
    const redirectInURL = new URLSearchParams(search).get('redirect')
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
            alert('Invalid error email or password yarrram')
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
            <title>Sign in</title>

            <h1>Sign in</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required  onChange={(e)=> setEmail(e.target.value) }></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required  onChange={(e)=> setPassword(e.target.value)}></input>

                <div>
                    <button type="submit">Sign in</button>
                </div>

                <div>
                    New Customer ? {" "}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </form>
        </div>
    )
}