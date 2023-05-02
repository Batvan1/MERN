export const getError = (error)=>{

    return error.response && error.response.data.message ?
     error.response.data.message: // Backend'te eşlesme false döner ise cevap olarak gönderdiğimiz obje içerisindeki key
     error.message // catch'te error objesinin içindeki message key'i
}



