import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from "axios";


const reducer = (state, action)=>{
    switch(action.type){
        case 'UPDATE_REQUEST':{
            return {...state, loadingUpdate: true}
        }

        case 'UPDATE_SUCCESS':{
            return {...state, loadingUpdate: false, updateSuccess: true}
        }

        case 'UPDATE_FAIL':{
            return {...state, loadingUpdate: false}
        }

        default:
            return state
    }
}



export default function ProfileScreen(){

    const {state, dispatch:ctxDispatch} = useContext(Store)
    const {userInfo} = state

    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    
    const [{loadingUpdate, updateSuccess}, dispatch] = useReducer(reducer,{loadingUpdate: false, updateSuccess: false})


    const submitHandler = async (e)=>{
        e.preventDefault()

        try {

            const {data} = await axios.put('/api/users/profile', {name, email, password},
            {
                headers: {Authorization: `Bearer ${userInfo.token}`}
            })

            dispatch({type: 'UPDATE_SUCCESS'}) // BURADAKİ useReducer'ın dispatch özelliği

            ctxDispatch({type: 'USER_SIGNIN'})// Store.js'de ki useReducer'ın dispatch özelliği / burada payload vermedim

            localStorage.setItem('userInfo', JSON.stringify(data))
            
        } catch (error) {

            dispatch({type: 'UPDATE_FAIL'})

            alert("profileScreen' de ki catch te kpoyduğum alert metodu çalıştı")
        }

    }

    return(

       
        <div>
           
            <h1>User Profile</h1>

            <form onSubmit={submitHandler}>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} required onChange={ (e)=>setName(e.target.value) } ></input>

                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} required onChange={ (e)=>setEmail(e.target.value) } ></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={ (e)=>setPassword(e.target.value) } ></input>

                <label htmlFor="confirm-password">Password</label>
                <input type="password" id="confirm-password" required onChange={ (e)=>setConfirmPassword(e.target.value) } ></input>

                    <button type="submit">Update</button>
            </form>

            {updateSuccess && <h1>İşlem Başarılı</h1>}

        </div>
    )
}