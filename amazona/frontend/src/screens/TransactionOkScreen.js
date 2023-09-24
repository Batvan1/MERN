import React from "react";
import { FaCheckCircle } from "react-icons/fa";


export default function TransactionOkScreen(){
    return(
        <div>

            <div className="payment-success">
           <h1>İşlem Başarılı</h1>

                <FaCheckCircle  color="green" size="3rem"></FaCheckCircle>

           <h1>Siparişiniz 2 iş günü içerisinde kargoya verilecektir</h1>
           </div>
           
        </div>
    )
}