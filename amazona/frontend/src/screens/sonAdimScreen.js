import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";





// React'tan gelen useReducer'in ilk parametresindeki reducer fonksiyonu
const reducer = (state, action) => {
    switch (action.type) {
        case 'ORDER_SUCCESS': {
            return { ...state, dbOrder: action.payload }
        }

        default: {
            return state
        }
    }
}





// SonAdimScreen Component'ı
export default function SonAdimScreen() {

    const { dOId } = useParams()


    const { state } = useContext(Store) // ayrı klasörde oluşturduğumuz useReducer yapısı

    const navigate = useNavigate()



    // react'tan gelen useReducer yapısı oluşturuldu
    const [{ dbOrder }, dispatch] = useReducer(reducer, { dbOrder: {} })




    // useState yapıları oluşturuldu react'ta olan input değerlerini almak için
    const [cartUserName, setCartUserName] = useState()
    const [cartNumber, setCartNumber] = useState()
    const [expireMonthYear, setExpireMonthYear] = useState()
    const [cvc, setCvc] = useState()
    // use state yapıları son 




    // React'tki useEffect metodu kullandı
    useEffect(() => {

        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/ben/${dOId}`)

                dispatch({ type: 'ORDER_SUCCESS', payload: data }) // useReducer yapısının tetikleyicisi


            } catch (error) {
                alert("sonadim sayfasındaki useeffecti içerisindeki fetchorder fınksiyonun içindeki catch çalıştı")
            }
        }

        if (!state.userInfo) {
            return navigate('/signup')// userInfo key'i yoksa kayıt ol sayfasına yönlendiriyorum 
        }

        fetchOrder()
    }, [dOId, state.userInfo, navigate])



    
    //Expiremoth/year start
    const expireMonthYearHandler = (e) => {
        let yeniTarih = e.target.value

        // Eğer girdi 2 karakterden uzunsa ve "/" işareti yoksa, otomatik olarak "/" ekler
        if (yeniTarih.length >= 2 && yeniTarih.indexOf("/") === -1) {
            yeniTarih = yeniTarih.slice(0, 2) + "/" + yeniTarih.slice(2);
        }

        setExpireMonthYear(yeniTarih)
    }
    //Expiremoth/year end





    // iyzicoya gönderilecek önemli veriler. sayfadaki butona basınca aktifleşecek sayemizde start
    const endSubmitHandler = async (e) => {

        e.preventDefault()

        try {

            if (kabulDurum) {
                const { data } = await axios.post('/api/orders/payment', {
                    totalItemsPrice: dbOrder.itemsPrice,
                    endTotalPrice: dbOrder.totalPrice,

                    cartUserName: cartUserName,
                    cartNumber: cartNumber,
                    expireMonthYear: expireMonthYear,
                    cvc: cvc,

                    id: state.userInfo._id,
                    email: state.userInfo.email,

                    fullName: dbOrder.shippingAddress.fullName,
                    city: dbOrder.shippingAddress.city,
                    country: dbOrder.shippingAddress.country,
                    address: dbOrder.shippingAddress.address,
                    postalCode: dbOrder.shippingAddress.postalCode,

                    items: dbOrder.orderItems

                })

                console.log(data)

                if (data.status !== "success") {
                    return alert("Ödeme Başarısız. " + data.errorMessage)
                }

                navigate('/paymentSuccess') // react'tan gelen usenavigate ile app js 'de oluşturduğum routerlarımı (react yapısı) karşılayacak istek yaptım 



            } else {
                alert("Lütfen Sözleşmeyi okuyup kabul edin")
            }


        } catch (error) {
            console.log(error)
            alert("sona adim sayfasındaki end fonksiyonunda catch çalıştı")
        }
    }
    // iyzicoya gönderilecek önemli veriler. sayfadaki butona basınca aktifleşecek sayemizde end



    //Pop-up açma ve kapama fonksiyonları Start. React bir çağırma kullanıldı altta 

    const [kabulDurum, setKabulDurum] = useState(false)
    const [isPopup, setIsPopup] = useState(false)

    const popUpOpen = () => {
        setIsPopup(true)
    }


    const popUpClose = () => {
        setIsPopup(false)
    }
    //Pop-up açma ve kapama fonksiyonları End. React bir çağırma kullanıldı altta



    return (
        <div className="son-container">

            <form onSubmit={endSubmitHandler}>

                <div className="son-div">

                    <label className="son-label" htmlFor="cart-user">Kart Üzerindeki Ad Soyad</label>
                    <input required className="son-input" type="text" id="cart-user" onChange={(e) => setCartUserName(e.target.value)}></input>

                </div>

                <div className="son-div">

                    <label className="son-label" htmlFor="cart-number">Kart Numarası</label>

                    <input required className="son-input" type="text" id="cart-number" onChange={(e) => setCartNumber(e.target.value)}></input>

                </div>

                <div className="son-div">

                    <label className="son-label" htmlFor="cart-expire">Ay/Yıl</label>
                    <input required value={expireMonthYear} className="son-input" type="text" id="cart-expire" onChange={expireMonthYearHandler}></input>

                </div>

                <div className="son-div">

                    <label className="son-label" htmlFor="cart-cvc">CVC</label>
                    <input required className="son-input" type="text" id="cart-cvc" onChange={(e) => setCvc(e.target.value)}></input>

                </div>

                <div>
                    <input type="checkbox" className="son-check" onChange={(e) => setKabulDurum(e.target.checked)} /> <button id="showPopup" onClick={popUpOpen}>Mesafeli Satış Sözleşmesi</button> <span className="sonadim-span">okudum kabul ediyorum</span>
                </div>

                {isPopup && <div id="popup" onClick={() => setIsPopup(false)}>
                    <div id="popup-content">

                        İşbu Mesafeli Satış Sözleşmesi

                        <h2>Madde 1. Taraflar</h2>
                        <ul>
                            <li>Satıcı; Metin Müzik</li>
                            <li>Alıcı: {dbOrder.shippingAddress.fullName} (Ad, soyad bilgileri sipariş işleminin tamamlanmasından sonra sunulacaktır.)</li>
                        </ul>
                        <p>Bundan böyle Mağaza ve Alıcı birlikte "Taraflar" olarak anılacaktır. Taraflar www.kitantik.com sitesinde belirtilen kurallar dahilinde platform üzerinden birbirleri ile iletişim kurabileceklerdir.</p>
                        <h2>Madde 2. Sözleşmenin Konusu</h2>
                        <p>İşbu Mesafeli Satış Sözleşmesi'nin (Bundan sonra Sözleşme olarak anılacaktır) konusu, nitelikleri ve satış fiyatı aşağıda belirtilen ürünler ile ilgili olarak 4077 sayılı Tüketicinin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin tespitidir.</p>
                        <h2>Madde 3. Ürün Bilgileri</h2>
                        <p>İşbu Sözleşme konusu ürüne; ürünün satış bedeline, teslim ve ödeme şekillerine ait bilgiler aşağıdaki gibidir:</p>

                        {dbOrder.orderItems.map((x) => {
                            return <ul>
                                <li>Ürün Numarası:{x.product}</li>
                                <li>Ürün Adı:{x.name}</li>
                                <li>Ürün Miktarı(Adet): {x.quantity}</li>
                                <li>Birim Fiyat (KDV dahil): {x.price} TL</li>
                                <li>Kargo Ücretini Karşılayacak Taraf: Alıcı</li>
                                <li>Toplam Fiyat (KDV dahil): {dbOrder.orderItems.reduce((a, c) => a + c.price, 0)} TL</li>
                            </ul>
                        })}


                        <h2>Madde 4: Genel Hükümler</h2>

                        <h2>4.1- ALICI'nın Bilgi Sahibi Olması</h2>
                        <p>ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürün/ürünlerin temel nitelikleri, satış fiyatı, ödeme şekli, teslimat koşulları, cayma hakkı ve diğer bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul ve beyan eder.</p>

                        <h2>4.2- Teslimat Koşulları</h2>
                        <p>Sözleşme konusu ürün/ürünler, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre içinde ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.</p>

                        <h2>4.3- Teslimat Sorumluluğu</h2>
                        <p>Sözleşme konusu ürün/ürünler, ALICI’dan başka bir kişi/kuruluşa teslim edilecek ise, teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.</p>

                        <h2>4.4- Ürün Sağlam ve Eksiksiz Teslim Edilmesi</h2>
                        <p>SATICI, sözleşme konusu ürün/ürünlerin sağlam, eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri ve kullanım kılavuzları ile teslim edilmesinden sorumludur.</p>

                        <h2>4.5- Ödeme ve Teslimat</h2>
                        <p>Sözleşme konusu ürün/ürünlerin teslimatı için işbu sözleşmenin imzalı nüshasının SATICI’ya ulaştırılmış olması ve bedelinin ALICI’nın tercih ettiği ödeme şekli ile ödenmiş olması şarttır. Herhangi bir nedenle ürün/ürünler bedeli ödenmez veya banka kayıtlarında iptal edilir ise, SATICI ürün/ürünlerin teslimi yükümlülüğünden kurtulmuş kabul edilir.</p>

                        <h2>4.6- Kredi Kartı Kötüye Kullanımı</h2>
                        <p>Ürün/ürünlerin tesliminden sonra ALICI’ya ait kredi kartının ALICI’nın kusurundan kaynaklanmayan bir şekilde yetkisiz kişilerce haksız veya hukuka aykırı olarak kullanılması nedeni ile ilgili banka veya finans kuruluşunun ürün/ürünler bedelini SATICI’ya ödememesi halinde, ALICI kendisine teslim edilmiş olan ürün/ürünleri 3 gün içinde SATICI’ya göndermekle yükümlüdür. Bu takdirde kargo giderleri ALICI’ya aittir.</p>

                        <h2>4.7- Siparişin İptali ve İade</h2>
                        <p>SATICI, sipariş konusu ürün/ürünlerin stokta bulunmaması halinde, sözleşmeden doğan yükümlülüklerini yerine getiremeyeceğini ALICI’ya bildirmekle yükümlüdür. Bu durumda ALICI, siparişin iptal edilmesini, sözleşme konusu ürün/ürünlerin varsa emsali ile değiştirilmesini ve/veya teslimat süresinin engelleyici sebebin ortadan kalkmasına kadar ertelenmesini SATICI’dan talep edebilir. ALICI’nın siparişi iptal etmesi halinde ödediği tutar 14 gün içinde kendisine iade edilir.</p>

                        <h2>4.8- Cayma Hakkının Kullanımı</h2>

                        a) 3. kişiye veya ALICI’ya teslim edilen ürün/ürünlerin faturası, (İade edilmek istenen ürün/ürünlerin faturası kurumsal ise, geri iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)

                        b) İade formu,

                        c) İade edilecek ürün/ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.

                        d) SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 14 gün içerisinde toplam bedeli ve ALICI’yı borç altına sokan belgeleri ALICI’ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.

                        e) ALICI’nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkansızlaşırsa ALICI kusuru oranında SATICI’nın zararlarını tazmin etmekle yükümlüdür.

                        f) Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.

                        <h2>MADDE 5- CAYMA HAKKI</h2>
                        <p>ALICI; malın kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 (ondört) gün içerisinde, hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir...</p>

                        <h2>MADDE 6- CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER</h2>
                        <p>Niteliği itibarıyla iade edilemeyecek ürünler, tek kullanımlık ürünler, kopyalanabilir yazılım ve programlar, hızlı bozulan veya son kullanma tarihi geçen ürünler için cayma hakkı kullanılamaz...</p>

                        <h2>MADDE 7- YETKİLİ MAHKEME</h2>
                        <p>İşbu Sözleşme'nin uygulanmasında, Sanayi ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri ile ALICI'nın veya SATICI'nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir. Siparişin gerçekleşmesi durumunda ALICI işbu Sözleşme'nin tüm koşullarını kabul etmiş sayılır.</p>

                        <p><strong>SATICI</strong></p>
                        <p>AD-SOYAD: Batuhan Öztüfekçi</p>


                        <p><strong>ALICI</strong></p>
                        <p>AD-SOYAD: {dbOrder.shippingAddress.fullName}</p>



                    </div>
                </div>}


                <button className="son-btn" type="submit">Güvenle öde</button>

            </form>

            <img className="son-iimg" src="/images/logo/aa.png" alt="iyzico"></img>

        </div>
    )
}