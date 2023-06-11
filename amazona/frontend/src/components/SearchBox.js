import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SearchBox(){

    const navigate = useNavigate()

    const [query, setQuery] = useState()

    const submitHandler = (e)=>{
        e.preventDefault()

        navigate(query ? `/search/?query=${query}` : '/search')
    }

    return(
        <form onSubmit={submitHandler}>

            <input type="text" name="q" id="q" onChange={(e)=> setQuery(e.target.value)} placeholder="Haydi Ara"></input>

            <button type="submit">Ara</button>

        </form>
    )
}