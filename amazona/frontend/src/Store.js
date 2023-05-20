import { createContext, useReducer } from "react";

export const Store = createContext()

const initialState = {

    userInfo: localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) :
    null,

    cart:{

        shippingAddress: localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) :
        {},

        paymentMethod: localStorage.getItem('paymentMethod') ?
        JSON.parse(localStorage.getItem('paymentMethod')) :
        '',

        cartItems: localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) :
        []
    },
}

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':
            // add to cart
            const newItem = action.payload // quantity key 'İ birlikte gelen yeni nesne
            
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id) // Bu satırda eğer ki cart içerisidneki cartItems içerisindeki dizi içinde objelerden herhangi birinin id key'i newItems içerisindeki id key'i ile denkleşiyorsa buradan TRUE dönüyor ve id'si denkleşen objede dönüyor tek başına find sayesinde ve alt satırdaki kısa if else 'li kod çalışıyor. Alttaki satırda ise bir üste gittiğimiz cart içerisindeki cartItems'a tekrar gidiyoruz bunun içerisinde biliyoruzki dizi içindeki objeler var (yoksa if elsede ki son kısm else çalışıyor) bu objelerin id key'i bi üstendeki değişkenin kod sonucunun (obje) id'sine eşitse bu değişkenin sonucu newItem oluyor. Saçmalık burada başlıyor zaten çünkü existItem mın sonucu cart.cartItems ve biz map ile cart.cartItem içindeki id ile existItem içindeki id yi karşılaştırıyoruz sonucun true dönmesinden başka seçenek yok bu yüzden bu değikenin sonucu direk newItem oluyor

            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem ] // zaten cartItems boşsa veya yeni gelen objenin id key'i cartItems içerisinde yer almıyorsa else kısmındaki bu bölüm çalışır. değilse else kısmından önceki iki parağraf çalışır
           
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            console.log(state)
            return {...state, cart: {...state.cart, cartItems} }

            case 'CART_REMOVE_ITEM':{
                // remove cart
                const cartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id)

                localStorage.setItem('cartItems',JSON.stringify(cartItems))

                return {...state, cart:{...state.cart, cartItems}}
            }

            case 'CART_CLEAR':{
                return {...state, cart:{...state.cart, cartItems: []}}
            }

            case 'USER_SIGNIN':{
                return {...state, userInfo: action.payload}
            }

            case 'USER_SİGNOUT':{
                return { ...state, userInfo: null, cart:{cartItems: [], shippingAddress: {}, paymentMethod: '' }} // cart'tan sonrası gereksiz
                
            }

            case 'SAVE_SHIPPING_ADDRESS':{
                return {...state, cart:{...state.cart, shippingAddress: action.payload}}
            }

            case 'SAVE_PAYMENT_METHOD':{
                return {...state, cart:{...state.cart, paymentMethod: action.payload}}
            }
    
        default:
            return state
    }
}


export function StoreProvider(props){

    const [state,dispatch] = useReducer(reducer, initialState)
    const value = {state,dispatch}

    return <Store.Provider value={value}>{props.children}</Store.Provider>

}