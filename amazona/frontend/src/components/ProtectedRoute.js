import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

export default function ProtectedRoute({ children }) {

    const { state } = useContext(Store)
    const { userInfo } = state



    return userInfo ? children : <Navigate to="/signin" />

}
/*Kullanıcı giriş yaptığında ona giriş yaptığı bilgileri ve tokenlanmış toplu bilgilerini userInfo objesinde tutuyoruz
 bu obje (state--React tanımı) doluysa  children ' e yönlendiriyoruz peki children ne ?
  children bu component'In (ProtectedRoute) altında bulunan component.
   Bu yönlendirme işlemini app.js 'de bulunann router yapısı ile yapıyoruz..
    Eğer ki userInfo objesi boşsa /signin sayfasına yönlendiriyoruz.
     */
