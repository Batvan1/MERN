import axios from "axios";
import React, { useState } from "react";


export default function CommunicationScreen() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [konu, setKonu] = useState()


    const submitHandler = async (e) => {

        e.preventDefault()

        try {
            const { data } = await axios.post("/api/communication", {
                communicationName: name,
                communicationEmail: email,
                communicationKonu: konu

            })

            alert(data.message)

        } catch (error) {
            console.log(error)
            alert("MESAJINIZI GÖNDERİRKEN BİR HATA OLUŞTU")
        }

    }


    return (
        <div>
            <h1 className="communication-h1">İletişim</h1>

            <form onSubmit={submitHandler}>

                <div className="communication-div">
                    <label className="communication-label">Adınız</label>
                    <input type="text" required onChange={(e) => setName(e.target.value)} className="communication-input"></input>

                    <label className="communication-label">Email</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} className="communication-input"></input>

                    <label className="communication-label">Konu</label>
                    <textarea required onChange={(e) => setKonu(e.target.value)} className="communication-texrarea"></textarea>

                    <button type="submit" className="communication-button">Gönder</button>
                </div>

              


            </form>


        </div>
    )
}