import axios from "axios"
import { useContext, useEffect, useReducer } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { Store } from "../Store"
import { getError } from "../utils"




const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }

        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false }

        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}



const ProductScreen = () => {

    const Navigate = useNavigate()

    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    })


    useEffect(() => {

        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST' })

            try {
                const result = await axios.get(`/api/product/slug/${slug}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })


            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
                console.log(err)
            }

        }
        fetchData()

    }, [slug])



    const { state, dispatch: ctxDispatch } = useContext(Store) // yukarıdaki dispatch ile karışmasın diye  dispathc:ctxDispatch diyerek ctxDispatch kullanıldı
    const { cart } = state

    const addToCartHandler = async () => {

        const exisItem = cart.cartItems.find(x => x._id === product._id)//Prodcut screende add to cart 'a ikinci kere basıldığında sayınının 1 de kalmamasını sağlamak yani sayıyı iki yapmak için kullanıldı bu kod.
        const quantity = exisItem ? exisItem.quantity + 1 : 1


        const rr = await axios.get(`/api/product/${product._id}`)


        if (rr.data.countInStock < quantity) {
            window.alert('Sorry. Product is out stock.')
            return;
        }

        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }, })

        Navigate("/cart")

    }



    return (

        loading ? <div>loading...</div> : error ? <div>{error}</div> :


            <div className="product-screen">

                <Helmet>
                    <title>Product Cart</title>
                </Helmet>

                <img className="img-large" src={product.image} alt={product.name}></img>

                <div className="product-div">
                    <h1 className="product-name">{product.name}</h1>
                    <i className="product-rating">{product.rating}</i>
                    <p className="product-price">Fiyat: ${product.price}</p>
                    <p className="product-description">{product.description}</p>
                </div>

                <div className="product-div">
                    <p className="product-price">Fiyat: {product.price} TL</p>
                    <p className="product-countInStock">Status: {product.countInStock ? <span>var</span> : <span>kalmadı</span>} </p>
                    <button className="btn" onClick={addToCartHandler}>Sepete Ekle</button>
                </div>

            </div>
    )
}

export default ProductScreen