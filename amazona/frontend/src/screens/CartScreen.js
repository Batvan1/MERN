import { useContext } from "react";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function CartScreen() {

    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state

    const navigate = useNavigate()

// incremet start
   const updateCartHandler =async (item, quantity)=>{
    const {data} = await  axios.get(`/api/product/${item._id}`)

    if(data.countInStock < quantity){
        window.alert('Sorry. Product is out stock.')
        return;
    }

    dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity},})
   }
   // increment end

   //decrement start
   const updateCartHandler1 = (item, quantity)=>{

    if(item.quantity === 0){
        return;
    }else{
        dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity},})
    }
    
   }
   //decrement end

   // removeCart start
   const removeCartHandler = (item)=>{
    dispatch({type:'CART_REMOVE_ITEM', payload: item })
   }
   //removeCart end

   const checkoutHandler = ()=>{
    navigate('/signin?redirect=/shipping')
   }

    return (
        <div>
            <title>Shopping Cart</title>
            <h1>Shopping Cart</h1>

            <div className="mesage">

                {cartItems.length === 0 ?
                    <div>Cart is empty <Link to="/"> GO Shopping </Link></div> :

                    <div className="cart-container"> {cartItems.map((item) =>
                        <div key={item._id}>
                            <img src={item.image} alt={item.name} className="cart-image">

                            </img>{" "}
                            <Link to={`/product/${item.slug}`}>{item.name}</Link>

                            <div>
                                <button onClick={()=> updateCartHandler1(item, item.quantity - 1)}><i className="fas fa-minus-circle">--</i></button>{" "}

                                <span>{item.quantity}</span>{" "}

                                <button  onClick={()=> updateCartHandler(item, item.quantity + 1)}><i className="fas fa-minus-circle">++</i></button>{" "}
                                
                                <div>${item.price} </div>

                                <div>
                                    <button onClick={()=> removeCartHandler(item)}>
                                        <i className="fas fa-trash">Sil</i>
                                    </button>
                                </div>
                            </div>
                        </div>)}

                    </div>}
                    
                    <div className="total">
                        <h3>
                            Subtotal  {cartItems.reduce((a , c) => a + c.quantity, 0)} {" "}

                            ${cartItems.reduce((a , c )=> a + c.quantity * c.price , 0)}
                        </h3>

                        <div>
                            <button onClick={checkoutHandler}>Proceed to checkout</button>
                        </div>
                    </div>
            </div>

        </div>
    )
}