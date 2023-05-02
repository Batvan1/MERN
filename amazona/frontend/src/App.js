
import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { Store } from './Store.js';
import CartScreen from './screens/CartScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import ShippingAdressScreen from './screens/ShippingAdress.js';
import SignupScreen from './screens/SignupScreen.js';
import PaymentMethodScreen from './screens/PaymentMethodScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';




function App() {

  const { state, dispatch: ctxDispatch} = useContext(Store)
  const { cart, userInfo } = state



  const signoutHandler = ()=>{

    ctxDispatch({type: 'USER_SİGNOUT'})

    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    
  }


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">

          <Link to="/">amazona</Link>
          <Link to="/cart">CART{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Link>
          {userInfo ? (
            <div>
              <div>{userInfo.name}</div>
              <Link to='/profile'>User Profile</Link>{" "}
              <Link to='/orderhistory'>Order History</Link>{" "}
              <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
            </div>
          ) : (<Link to='/signin'>Sing In</Link>)}

        </header>
        <main>

          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />

            <Route path='/' element={<HomeScreen />} />

            <Route path='/cart' element={<CartScreen />} />

            <Route path='/signin' element={<SigninScreen />} />

            <Route path='/signup' element={<SignupScreen />} />

            <Route path='/shipping' element={<ShippingAdressScreen/>}/>

            <Route path='/payment' element={<PaymentMethodScreen/>}/>

            <Route path='/placeorder' element={<PlaceOrderScreen/>}/>

            <Route path='/order/:id' element={<OrderScreen/>}/>
           

          </Routes>


        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
