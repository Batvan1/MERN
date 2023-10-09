import { useContext } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
// Aşağıdakiler react icons kütüphanesi
import { MdDelete } from "react-icons/md"
import { MdRemove } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Helmet } from "react-helmet-async";


export default function CartScreen() {

    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state

    const navigate = useNavigate()

    // incremet start
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/product/${item._id}`)

        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out stock.')
            return;
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity }, }) // store.js'den gelen useReducer yapısı (react yapısı)
    }
    // increment end

    //decrement start
    const updateCartHandler1 = (item, quantity) => {
        // item.quantity değerini quantity parametresine eşitle
        item.quantity = quantity;
        // dispatch fonksiyonunu çağır
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity }, })
        // Koşulu kontrol et
        if (item.quantity === 0) {
          dispatch({type: 'CART_REMOVE_ITEM', payload: item})
        }
      }
      
    //decrement end

    // removeCart start
    const removeCartHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }
    //removeCart end

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>

            <h1>Sepetim</h1>

            <div className="mesage">

                {cartItems.length === 0 ?
                    <div>Cart is empty <Link to="/"> GO Shopping </Link></div> :

                    <div className="cart-container"> {cartItems.map((item) =>

                        <div key={item._id} className="cart-item">

                            <img src={item.image} alt={item.name} className="cart-image"></img>{" "}


                            <Link to={`/product/${item.slug}`} className="cart-name">{item.name}</Link>

                            <div className="cart-details">

                                <button onClick={() => updateCartHandler1(item, item.quantity - 1)}>

                                    <MdRemove size="50" color="green" /> {/* React icons kütüphanesi*/}

                                </button>{" "}

                                <span className="cart-quantity">{item.quantity}</span>{" "}

                                <button onClick={() => updateCartHandler(item, item.quantity + 1)}>

                                    <MdAdd size="50" color="blue" /> {/* React icons kütüphanesi*/}

                                </button>{" "}

                                <div className="cart-price">{item.price} TL</div>

                                <div className="cart-delete">

                                    <button onClick={() => removeCartHandler(item)} className="mini-btn">
                                        <MdDelete size="40" color="red" /> {/* React icons kütüphanesi*/}
                                    </button>

                                </div>
                            </div>
                        </div>)}

                    </div>}

                <div className="total">
                    
                        <h3>
                            Toplam Adet : {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </h3>

                        <h3>
                            Toplam Tutar : {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} TL
                        </h3>

                </div>

                <div className="div-btn">
                    <button onClick={checkoutHandler} className="btn" disabled={cartItems.length === 0}>Ödeme</button>
                </div>


            </div>

        </div>
    )
}