import { useContext, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }

        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }

        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}



const HomeScreen = () => {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    })

    //const [product , setProduct] = useState([]) // sokuk reactın içinden gelen metot

    const { state, dispatch: ctxDispatch } = useContext(Store)

    const Navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get('/api/product')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }




        }
        fetchData()

    }, [])


    const addToCartHandler = async (product) => {

        try {

            const existItem = state.cart.cartItems.find(x => x._id === product._id)

            const quantity = existItem ? existItem.quantity + 1 : 1

            const { data } = await axios.get(`/api/product/slug/${product.slug}`)

            ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...data, quantity }, })

            Navigate("/cart")



        } catch (error) {
            console.log(error)
        }


    }

    console.log(products)
    return (
        <div>

            <Helmet>
                <title>Metin Müzik</title>
            </Helmet>

            <div className='home-div-title'>
                <h1 className='home-h1' data-text="Özel&nbsp;Ürünler">Özel Ürünler</h1>
            </div>

            <div className="home-products">

                {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (

                    products.map(product => (
                        <div className="home-product" key={product.slug}>

                            <Link to={`/product/${product.slug}`}>
                                <img src={product.image} alt={product.name} className='home-img'></img>
                            </Link>

                            <div className="home-product-info">

                                <Link to={`/product/${product.slug}`}>
                                    <p className='home-name'> {product.name}</p>
                                </Link>

                                <strong className='home-price'>{product.price} TL</strong>

                            </div>

                            <button className='home-btn' onClick={() => addToCartHandler(product)}>Sepete Ekle</button>

                        </div>

                    )))}
            </div>
        </div>
    )
}

export default HomeScreen