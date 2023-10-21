import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";

export default function SearchBox(){

    const navigate = useNavigate()

    const [query, setQuery] = useState()

    const submitHandler = (e)=>{
        e.preventDefault()

        navigate(query ? `/search/?query=${query}` : '/search')
    }

    return(
        <form onSubmit={submitHandler} className="search-box">

            <input type="text" name="q" id="header-searchbox" onChange={(e)=> setQuery(e.target.value)} placeholder="Haydi Ara"></input>

            <button type="submit" className="search-button"><MdSearch className="search-box-icon"/></button>

        </form>
    )
}