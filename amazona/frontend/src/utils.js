export const getError = (error)=>{

    return error.response && error.response.data.message ?
     error.response.data.message: // axios hata mesajı
     error.message // catch'te error objesinin içindeki message key'i
}



