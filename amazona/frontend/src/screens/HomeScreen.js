import { useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

const reducer = (state , action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state , loading: true}
        
        case 'FETCH_SUCCESS':
            return {...state , products: action.payload, loading: false}

        case 'FETCH_FAIL':
            return {...state, loading: false , error: action.payload}
            
        default:
            return state
        }
}



const HomeScreen = () => {

    const [{loading,error,products}, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    })

    //const [product , setProduct] = useState([]) // sokuk reactın içinden gelen metot

    useEffect(()=>{

        const fetchData = async ()=>{

            dispatch({type: 'FETCH_REQUEST'})

            try{
              const result = await axios.get('/api/product')
                dispatch({type: 'FETCH_SUCCESS' , payload: result.data })
                
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err.message})
            }

            
            
    
        }
        fetchData()

    },[])

   
    return (
        <div>

            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1>Featured Products</h1>

            <div className="products">

                {loading ? <div>Loading...</div>: error ? <div>{error}</div> :(
                
                products.map(product => (
                    <div className="product" key={product.slug}>

                        <Link to={`/product/${product.slug}`}>
                            <img src={product.image} alt={product.name}></img>
                        </Link>

                        <div className="product-info">

                            <Link to={`/product/${product.slug}`}>
                                <p> {product.name}</p>
                            </Link>

                            <p> <strong>{product.price} </strong></p>
                            <button>Add to cart</button>

                        </div>

                    </div>

                )))}
            </div>
        </div>
    )
}

export default HomeScreen