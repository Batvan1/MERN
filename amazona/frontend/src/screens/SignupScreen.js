import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";

export default function SignupScreen(){



    const navigate = useNavigate()

    const {search} = useLocation()
    const redirectInURL = new URLSearchParams(search).get('redirect')
    const redirect = redirectInURL ? redirectInURL : '/'


    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const {state , dispatch: ctxDispatch} = useContext(Store)

    const {userInfo} = state

    const submitHandler = async (e)=>{
        e.preventDefault()

        if(password !== confirmPassword){
            alert("Password do not match")
            return;
        }

        try {

            const {data} = await axios.post('/api/users/signup', { email, password, name })

            ctxDispatch({type: 'USER_SIGNIN', payload: data})

            localStorage.setItem('userInfo', JSON.stringify(data))

            navigate(redirect || '/')

        } catch (error) {
            alert('a error yarram')
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
            <title>Sign up</title>
            </Helmet>

            <h1>Sign up</h1>
            <form onSubmit={submitHandler}>

                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" required onChange={(e)=> setName(e.target.value)}></input>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" required  onChange={(e)=> setEmail(e.target.value) }></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required  onChange={(e)=> setPassword(e.target.value)}></input>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" required  onChange={(e)=> setConfirmPassword(e.target.value)}></input>


                <div>
                    <button type="submit">Sign up</button>
                </div>

                <div>
                Already have an account {" "}
                    <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </form>
        </div>
    )
}