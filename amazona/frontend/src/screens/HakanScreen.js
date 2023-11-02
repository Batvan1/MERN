import axios from "axios";
import React, { useState } from "react";

export default function HakanScreen() {

    const [file, setFile] = useState()
    const [name, setName] = useState()
    const [slug, setSlug] = useState()
    const [price, setPrice] = useState()
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [rating, setRating] = useState()
    const [numReviews, setNumReviews] = useState()
    const [countInStock, setCountInStock] = useState()
    const [status, setStatus] = useState()

    const upload = async () => {

        try {


            // FormData nesnesi oluştur
            const formData = new FormData();
            // FormData nesnesine dosya ve metin verilerini ekle
            // append metodunun ilk parametresi aslında bir obje key'i gibi çalışıyor. 
            formData.append("image", file);
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("price", price);
            formData.append("brand", brand);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("rating", rating);
            formData.append("numReviews", numReviews);
            formData.append("countInStock", countInStock);
            formData.append("status", status);

            console.log(file)




            const { data } = await axios.post("/api/product/hakan", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

        } catch (error) {
            // Hata yakalandığında burada işlemler yapabilirsiniz.
            if (error.response) {
                // Sunucu tarafından dönen hata yanıtı var
                console.error("Sunucu hatası:", error.response.data);
                console.error("Hata kodu:", error.response.status);
            } else if (error.request) {
                // İstek yapıldı ancak yanıt alınamadı
                console.error("Yanıt alınamadı:", error.request);
            } else {
                // Bir istek yaparken hata oluştu
                console.error("İstek sırasında hata:", error.message);
            }
        }



    }

    const handleChange = (event) => {
        setStatus(event.target.value); // seçilen değeri güncelle
      };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>

            <div>
                <label>
                    Name
                    <input type="text" onChange={(e) => setName(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Slug
                    <input type="text" onChange={(e) => setSlug(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Status
                    <select value={status} onChange={handleChange}> 
                        <option value="new">Yeni</option> 
                        <option value="used">Kullanılmış</option> 
                    </select>
                </label>
            </div>


            <div>
                <label>
                    Price
                    <input type="text" onChange={(e) => setPrice(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Brand
                    <input type="text" onChange={(e) => setBrand(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Category
                    <input type="text" onChange={(e) => setCategory(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Description
                    <input type="text" onChange={(e) => setDescription(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    Rating
                    <input type="text" onChange={(e) => setRating(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    numReviews
                    <input type="text" onChange={(e) => setNumReviews(e.target.value)}></input>
                </label>
            </div>

            <div>
                <label>
                    CountInStock
                    <input type="text" onChange={(e) => setCountInStock(e.target.value)}></input>
                </label>
            </div>



            <button type="button" onClick={upload}>Upload</button>
        </div>
    )
}