import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const HomeScreen = () => {

    const [product , setProduct] = useState([]) // sokuk reactın içinden gelen metot

    useEffect(()=>{

        const fetchData = async ()=>{
            await fetch('/api/product')
            .then(res =>{ return res.json()})
            .then(data => setProduct(data))
            .catch(err => console.log(err))
    
        }
        fetchData()

    },[])

   


   

    return (
        <div>
            <h1>Featured Products</h1>

            <div className="products">

                {product.map(product => (
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

                ))}
            </div>
        </div>
    )
}

export default HomeScreen