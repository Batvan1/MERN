
import { useContext, useEffect, useState } from 'react';
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
import SonAdimScreen from './screens/sonAdimScreen.js'
import OrderHistoryScreen from './screens/OrderHistoryScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import axios from 'axios';
import SearchBox from './components/SearchBox.js';
import SearchScreen from './screens/SearchScreen.js';





function App() {

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state



  const signoutHandler = () => {

    ctxDispatch({ type: 'USER_SİGNOUT' })

    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

    window.location.href = '/signin'

  }

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(()=>{

    const fetchCategories = async ()=>{
      try {

        const {data} = await axios.get(`/api/product/categories`)
        setCategories(data)

      } catch (error) {
        alert("app js deki useeffect içerisindeki catch bloğu çalıştı")
      }
    }

    fetchCategories()

  },[])


  return (
    <BrowserRouter>
      <div className={sideBarIsOpen ? "Apbenekle active-cont" : "App"}>
        <header className="App-header">

          <button onClick={() => setSideBarIsOpen(!sideBarIsOpen)}>Sidebar</button>


          <SearchBox/> {/*components klasöründen gelen component arama kutusu */}


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



        <div className={sideBarIsOpen ? 'active-nav side-navbar' : 'side-navbar'}>
          <nav>

            <div>
              <strong>Catagories</strong>
            </div>

            {categories.map((category)=>{
             return <div key={category}>
                <Link to={`/search?category=${category}`} onClick={()=>setSideBarIsOpen(false)}>{category}</Link>
              </div>
            })}

          </nav>
        </div>



        <main>

          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />

            <Route path='/' element={<HomeScreen />} />

            <Route path='/cart' element={<CartScreen />} />

            <Route path='/signin' element={<SigninScreen />} />

            <Route path='/signup' element={<SignupScreen />} />

            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/shipping' element={<ShippingAdressScreen />} />

            <Route path='/payment' element={<PaymentMethodScreen />} />

            <Route path='/placeorder' element={<PlaceOrderScreen />} />

            <Route path='/order/:id' element={<OrderScreen />} />

            <Route path='/sonAdim/:dOId' element={<SonAdimScreen />} />

            <Route path='/orderhistory' element={<OrderHistoryScreen />} />

            <Route path='/search' element={<SearchScreen />} />


          </Routes>


        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
