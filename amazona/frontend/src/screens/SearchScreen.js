import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";


const reducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_REQUEST': {
            return { ...state, loading: true }
        }

        case 'FETCH_SUCCESS': {
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false
            }
        }

        case 'FETCH_FAIL': {
            return { ...state, loading: false, error: action.payload }
        }

        default: {
            return state
        }
    }
}



const prices = [
    {
        name: '$1 to $50',
        value: '1-50'
    },
    {
        name: '$51 to $200',
        value: '51-200'
    },
    {
        name: '$201 to $1000',
        value: '201-1000'
    }
]




export const ratings = [
    {
        name: '4 stars & up',
        rating: 4
    },
    {
        name: '3 stars & up',
        rating: 3
    },
    {
        name: '2 stars & up',
        rating: 2
    },
    {
        name: '1 stars & up',
        rating: 1
    }
]



export default function SearchScreen() {

    const navigate = useNavigate()

    const { search } = useLocation()
    console.log(useLocation())
    const sp = new URLSearchParams(search) // search objesi params parametrelerini veriyor.. window location.search

    const category = sp.get('category') || 'all'

    const query = sp.get('query') || 'all'

    const price = sp.get('price') || 'all'

    const rating = sp.get('rating') || 'all'

    const order = sp.get('order') || 'newest'

    const page = sp.get('page') || 1


    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, {
        loading: true,
        error: ''
    })


    useEffect(() => {

        const fetchData = async () => {

            try {

                const { data } = await axios.get(`/api/product/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`)
                console.log('fetch data çalışltı')
                console.log(data)
                dispatch({ type: 'FETCH_SUCCESS', payload: data })

            } catch (error) {
                alert("search screen hata oldu fetchData")
                dispatch({ type: 'FETCH_FAIL', payload: 'hatalısın' })
            }

        }

        fetchData()

    }, [category, page, query, price, rating, order, error])






    const [categories, setCategories] = useState([])


    useEffect(() => {

        const fetchCategories = async () => {
            try {
                console.log("fetchCategories çalıştı")
                const { data } = await axios.get(`/api/product/categories`) // backendten dizi gönderiyorum bu isteğin sonucunda.

                setCategories(data)

            } catch (error) {
                alert("search screen hata oldu fetchCategories")
            }
        }

        fetchCategories()

    }, [])




    const getFilterUrl = (filter) => {

        const filterPage = filter.page || page
        const filterCategory = filter.category || category
        const filterQuery = filter.query || query
        const filterRating = filter.rating || rating
        const filterPrice = filter.price || price
        const filterOrder = filter.order || order

        // yukarıdaki fetchdata fonksiyonu içerisindeki istek ile aynı sıralaması farklı ve tabiki bu fonksiyonun çalışmasıyla objelerimizin değerleri değişiyor nasıl değişiyor kullanıcının bastığı butonlara göre değişiyor çünkü kullanıcı butona bastığında biz bu fonksiyonu çağırıyoruz ve yeni params değeri ile istek yapıyoruz
        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`
    }

    return (
        <div>
            <Helmet><title>Search Products</title></Helmet>

            <div className="search-department">
                <h3>Department</h3>

                <ul className="search-department-ul">
                    <li>
                        <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl({ category: 'all' })}>Any</Link>
                    </li>

                    {categories.map((c) => (

                        <li key={c}>

                            <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl({ category: c })}>{c}</Link>

                        </li>

                    ))}
                </ul>
            </div>



            <div className="search-price">
                <h3>Price</h3>

                <ul className="search-search-ul">
                    <li>
                        <Link className={'all' === price ? 'text-bold' : ''}
                            to={getFilterUrl({ price: 'all' })}>
                            Any
                        </Link>
                    </li>

                    {prices.map((p,i) => (

                        <li key={i}>

                            <Link className={p.value === price ? 'text-bold' : ''}
                                to={getFilterUrl({ price: p.value })}>
                                {p.name}
                            </Link>

                        </li>

                    ))}
                </ul>
            </div>



            {/* <div>
                <h3>Avg. Costumer Review</h3>

                <ul>
                    {ratings.map((r) => {

                        return (

                            <li key={r.name}>
                                <Link className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                    to={getFilterUrl({ rating: r.rating })}>
                                    {r.rating}
                                </Link>
                            </li>

                        )
                    })}

                    <li>
                        <Link className={rating === 'all' ? 'text-bold' : ''}
                            to={getFilterUrl({ rating: 'all' })}>
                            Dur bakalım ne olacak
                        </Link>
                    </li>

                </ul>
            </div> */}




            {loading ? <h1>Sayfa yükleniyor</h1> : error ? <h1>SearchScreen'de hata</h1> : (

                <div className="search-result">
                    <div className="search-mini-result">

                        <div>
                            <span className="search-result-span"> {countProducts === 0 ? 'No' : countProducts} Result </span>

                            <span className="search-result-before-span">
                                {query !== 'all' && ':' + query}
                                {category !== 'all' && ':' + category}
                                {price !== 'all' && ': Price' + price}
                                {rating !== 'all' && ': Rating' + rating + '& up'}
                            </span>
                        </div>
                        {query !== 'all' ||
                            category !== 'all' ||
                            rating !== 'all' ||
                            price !== 'all' ? (
                            <button onClick={() => navigate('/search')} className="search-result-btn">Butonke</button>
                        ) : null}
                    </div>

                    <div className="search-p-select">
                        <p className="search-sortBy">Sort by</p>
                        <select className="search-select" value={order} onChange={(e) => navigate(getFilterUrl({ order: e.target.value }))}>
                            <option value="newest">Newest Arrivals</option>
                            <option value="lowest">Price: Low To High</option>
                            <option value="highest">Price: High To Low </option>
                            <option value="toprated">Avg. Customer Reviews</option>
                        </select>
                    </div>


                    <div className="search-not-product">
                        {products.length === 0 && <h1>No Product Found</h1>}
                    </div>

                    <div className="search-result-products">
                        {products.map((product) => (
                            <div key={product._id} className="search-result-item">

                                <h1>{product.name}</h1>

                            </div>
                        ))}
                    </div>


                    <div>
                        {[...Array(pages).keys()].map((x) => (

                            <Link key={x + 1} className="mx-1" to={getFilterUrl({ page: x + 1 })}>

                                <button className={Number(page) === x + 1 ? 'text-bold' : ''}>
                                    {x + 1}
                                </button>

                            </Link>


                        ))}
                    </div>


                </div>

            )}


        </div>
    )
}