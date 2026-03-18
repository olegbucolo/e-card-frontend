import axios from "axios";
import { useState, useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom"
import { FaCreditCard } from "react-icons/fa";
import './CheckoutPage.css'
import { clearOrders } from "../utils/localStorage";

function CheckoutPage() {
    const { indexProducts, cartProducts, setCartProducts } = useOutletContext()

    // useEffect(() => {console.log('index products" ', indexProducts)}, [indexProducts])
    const [submitted, setSubmitted] = useState(false);

    const [newOrderId, setnewOrderId] = useState();

    const [sameBilling, setSameBilling] = useState(false);

    const firstproduct = "1";
    const secondProduct = "2";

    const endpoint = "http://localhost:3000/orders"
    const endpointMail = "http://localhost:3000/order"

    const endpointForBind = "http://localhost:3000/orderproduct"

    let orderShippingCost;
    let totalPrice;

    const navigate = useNavigate();

    const orderPrice = cartProducts.reduce((total, item) => {
        const product = indexProducts.find(
            p => p.id == item.id);
        if (!product) return total;
        return total + (product.price * item.quantity);
    }, 0)

    if (orderPrice > 0.000001 && orderPrice < 50) {
        orderShippingCost = 5;
        totalPrice = orderPrice + orderShippingCost;
    } else {
        orderShippingCost = 0;
        totalPrice = orderPrice + orderShippingCost;
    }

    useEffect(() => {
        setOrder(prev => ({
            ...prev,
            shippingCost: orderShippingCost
        }))
    }, [orderShippingCost])

    const [order, setOrder] = useState({
        customerName: "",
        customerSurname: "",
        customerMail: "",
        phone: "",
        streetName: "",
        streetNameBilling: "",
        city: "",
        cityBilling: "",
        postalCode: "",
        postalCodeBilling: "",
        province: "",
        provinceBilling: "",
        country: "",
        countryBilling: "",
        shippingCost: orderShippingCost
    })


    const products = cartProducts.map(item => {
        return indexProducts.find(p => p.id == item.id)
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setOrder(prev => ({
            ...prev,
            [name]: value,
            // Se sameBilling è true, aggiorna automaticamente i campi di fatturazione
            ...(sameBilling && name === "streetName" ? { streetNameBilling: value } : {}),
            ...(sameBilling && name === "city" ? { cityBilling: value } : {}),
            ...(sameBilling && name === "postalCode" ? { postalCodeBilling: value } : {}),
            ...(sameBilling && name === "province" ? { provinceBilling: value } : {}),
            ...(sameBilling && name === "country" ? { countryBilling: value } : {})
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        if (!order.customerName || !order.customerSurname || !order.customerMail || !order.phone || !order.streetName ||
            !order.streetNameBilling || !order.city || !order.cityBilling || !order.postalCode || !order.postalCodeBilling ||
            !order.province || !order.provinceBilling || !order.country || !order.countryBilling
        ) {
            alert("Compila tutti i campi obbligatori!");
            return;
        }

        const products = cartProducts.map(item => {
            const product = indexProducts.find(p => p.id == item.id)

            if (!product) return null

            return {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: item.quantity
            }
        }).filter(p => p !== null)

        try {
            console.log("ORDINE INVIATO:", order)
            const res = await axios.post(endpoint, order)

            const orderId = res.data.id

            alert(`Ordine inviato! ID ordine: ${orderId}`);

            if (cartProducts.length > 0) {

                for (const item of cartProducts) {

                    const product = indexProducts.find(p => p.id == item.id)

                    if (!product) continue

                    const orderProductData = {
                        orderId: orderId,
                        productId: product.id,
                        unitQuantity: item.quantity,
                        unitPrice: product.price
                    }

                    await axios.post(endpointForBind, orderProductData)
                }
            }

            console.log(orderId)

            await axios.post(endpointMail, {
                order,
                products
            })

            navigate("/thank_you_page")

        } catch (err) {
            console.error(err)
            alert("Errore di invio ordine")
        }
    }




    const stored = JSON.parse(localStorage.getItem('creditCardData')) || {};



    // const forms = document.querySelectorAll(".needs-validation");

    // Array.from(forms).forEach(form => {
    //     form.addEventListener("submit", event => {
    //         if (!form.checkValidity()) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //         }
    //         form.classList.add("was-validated");
    //     });
    // });



    return (
        <>
            <div className="main-container-checkout">
                <div className="p-container-checkout pt-3 mh-100vh">


                    <section className="free-shipping-banner">
                        <div className="container">
                            <div className="free-shipping-box">
                                🚚 Spedizione gratuita per ordini superiori a 50€
                            </div>
                        </div>
                    </section>


                    <div className="order-container-checkout-left">


                        {
                            cartProducts.map(item => {
                                const product = indexProducts.find(
                                    p => p.id == item.id
                                )
                                if (!product) return null

                                return (

                                    <div className="d-flex checkout-product-card mb-2" key={item.id}>

                                        <div className="card" style={{ width: "10rem" }}>

                                            <img src={product.image} className="card-img-top" alt="" />

                                        </div>

                                        <div className="product-detail-checkout">
                                            <h3>{product.title}</h3>
                                            <p className="avaible-text is-disponible">{product.is_featured === 1 ? "Disponibile" : "Non Disponibile"}</p>
                                            <p>Quantità: {item.quantity}</p>
                                            <p className="fw-bold">Prezzo: {(product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>

                    <p className="container btn-checkout-page max-min-checkout mb-0">Prezzo Totale: €{totalPrice.toFixed(2)}</p>

                    {/* Metodo di pagamento */}
                    <div className="container mt-3 d-flex justify-content-between btn-checkout-page btn-card-register mb-0">


                        <div className="w-20">
                            <FaCreditCard />
                        </div>
                        <div className="w-70 d-flex flex-nowrap">
                            <div className="w-50">
                                <p>{stored.cardNumber}</p>
                            </div>
                            <div className="w-50">
                                <p>{stored.cardExpiry}</p>
                            </div>
                        </div>


                    </div>
                    <div className="mt-4 payment-method-container  d-flex justify-content-around container p-0 ">
                        <Link className="w-100" to="/add_payment_method_page"><button className="w-100 pay-method bg-primary text-light py-3">
                            Aggiungi metodo di pagamento
                        </button>
                        </Link>
                    </div>
                </div>

                <div className="checkout-container d-flex justify-content-around">
                    <form onSubmit={handleSubmit} className="checkout-form w-70 mt-5 py-4 px-3 d-block d-sm-grid">

                        {/* campo nome utente */}
                        <div className="mb-3">
                            <label htmlFor="customer-name" className="form-label d-flex align-self-start">Nome: </label>
                            <input name="customerName" type="text" pattern="[A-Za-zÀ-ÿ\s]+" className={submitted && !order.customerName ? "input-error form-control" : "form-control"} id="customer-name" placeholder='inserisci il tuo nome: ' value={order.customerName} onChange={handleChange} />
                        </div>

                        {/* campo cognome utente */}
                        <div className="mb-3">
                            <label htmlFor="customer-surname" className="form-label d-flex align-self-start">Cognome: </label>
                            <input name="customerSurname" type="text" pattern="[A-Za-zÀ-ÿ\s]+" className={submitted && !order.customerSurname ? "input-error form-control" : "form-control"} id="customer-surname" placeholder='inserisci il tuo cognome: ' value={order.customerSurname} onChange={handleChange} />
                        </div>

                        {/* campo mail */}
                        <div className="mb-3">
                            <label htmlFor="customer-mail" className="form-label d-flex align-self-start">Email: </label>
                            <input name="customerMail" type="email" className={submitted && !order.customerMail ? "input-error form-control" : "form-control"} id="customer-mail" placeholder='Inserisci la tua Email: ' value={order.customerMail} onChange={handleChange} />
                        </div>

                        {/* campo numero telefono utente */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label d-flex align-self-start">Telefono: </label>
                            <input name="phone" type="tel" pattern="^\+?[0-9]{8,15}$" className={submitted && !order.phone ? "input-error form-control" : "form-control"} id="phone" placeholder='Inserisci il tuo numero di telefono: ' value={order.phone} onChange={handleChange} />
                        </div>

                        {/* campo nome via utente */}
                        <div className="mb-3">
                            <label htmlFor="street-name" className="form-label d-flex align-self-start">Residenza: </label>
                            <input name="streetName" type="text" className={submitted && !order.streetName ? "input-error form-control" : "form-control"} id="street-name" placeholder='Inserisci il tuo indirizzo di residenza: ' value={order.streetName} onChange={handleChange} />
                        </div>

                        {/* campo numero civico utente */}
                        <div className={`mb-3 ${sameBilling ? "d-none" : ""}`}>
                            <label htmlFor="street-name-billing" className="form-label d-flex align-self-start">Indirizzo di fatturazione: </label>
                            <input name="streetNameBilling" type="text" className={submitted && !order.streetNameBilling ? "input-error form-control" : "form-control"} id="street-name-billing" placeholder='Inserisci il tuo indirizzo di fatturazione: ' value={order.streetNameBilling} onChange={handleChange} />
                        </div>

                        {/* campo nome città utente */}
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label d-flex align-self-start">Città di residenza: </label>
                            <input name="city" type="text" className={submitted && !order.city ? "input-error form-control" : "form-control"} id="city" placeholder='Inserisci la tua città di residenza: ' value={order.city} onChange={handleChange} />
                        </div>

                        {/* campo città di fatturazione utente */}
                        <div className={`mb-3 ${sameBilling ? "d-none" : ""}`}>
                            <label htmlFor="city-billing" className="form-label d-flex align-self-start">Città di fatturazione: </label>
                            <input name="cityBilling" type="text" className={submitted && !order.cityBilling ? "input-error form-control" : "form-control"} id="city-billing" placeholder='Inserisci la città di fatturazione: ' value={order.cityBilling} onChange={handleChange} />
                        </div>

                        {/* campo codice postale utente */}
                        <div className="mb-3">
                            <label htmlFor="postal-code" className="form-label d-flex align-self-start">CAP: </label>
                            <input name="postalCode" type="text" pattern="[0-9]{5}" className={submitted && !order.postalCode ? "input-error form-control" : "form-control"} id="postal-code" placeholder='Inserisci il tuo codice postale: ' value={order.postalCode} onChange={handleChange} />
                        </div>

                        {/* campo numero codice postale utente */}
                        <div className={`mb-3 ${sameBilling ? "d-none" : ""}`}>
                            <label htmlFor="postal-code-billing" className="form-label d-flex align-self-start">CAP di fatturazione: </label>
                            <input name="postalCodeBilling" type="text" pattern="[0-9]{5}" className={submitted && !order.postalCodeBilling ? "input-error form-control" : "form-control"} id="postal-code-billing" placeholder='Inserisci il tuo codice postale di fatturazione: ' value={order.postalCodeBilling} onChange={handleChange} />
                        </div>

                        {/* campo provincia utente */}
                        <div className="mb-3">
                            <label htmlFor="province" className="form-label d-flex align-self-start">Provincia: </label>
                            <input name="province" type="text" pattern="[A-Za-zÀ-ÿ\s]+" className={submitted && !order.province ? "input-error form-control" : "form-control"} id="province" placeholder='Inserisci la provincia in cui abiti: ' value={order.province} onChange={handleChange} />
                        </div>

                        {/* campo provincia di fatturazione utente */}
                        <div className={`mb-3 ${sameBilling ? "d-none" : ""}`}>
                            <label htmlFor="province" className="form-label d-flex align-self-start">Provincia di fatturazione: </label>
                            <input name="provinceBilling" type="text" className={submitted && !order.provinceBilling ? "input-error form-control" : "form-control"} id="provinceBilling" placeholder='Inserisci la tua provincia di fatturazione: ' value={order.provinceBilling} onChange={handleChange} />
                        </div>

                        {/* campo Paese/Nazione utente */}
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label d-flex align-self-start">Paese: </label>
                            <input name="country" type="text" pattern="[A-Za-zÀ-ÿ\s]+" className={submitted && !order.country ? "input-error form-control" : "form-control"} id="country" placeholder='Inserisci la nazione in cui abiti: ' value={order.country} onChange={handleChange} />
                        </div>

                        {/* campo indirizzo di fatturazione */}
                        <div className={`mb-3 ${sameBilling ? "d-none" : ""}`}>
                            <label htmlFor="country-billing" className="form-label d-flex align-self-start">Paese di fatturazione: </label>
                            <input name="countryBilling" type="text" className={submitted && !order.countryBilling ? "input-error form-control" : "form-control"} id="country-billing" placeholder='Inserisci la nazione in cui abiti: ' value={order.countryBilling} onChange={handleChange} />
                        </div>


                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="sameBilling"
                                checked={sameBilling}
                                onChange={(e) => setSameBilling(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="sameBilling">
                                I dati di fatturazione corrispondono a quelli di spedizione
                            </label>
                        </div>
                        {/* Termini e condizioni */}
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                required
                            />
                            <label className="form-check-label" htmlFor="terms">
                                Accetto i termini e condizioni
                            </label>
                            <div className="invalid-feedback">
                                Devi accettare i termini e condizioni per procedere
                            </div>
                        </div>

                        <button type="submit" className="pay-method bg-success text-light py-3 grid-col-span-2">Procedi con l'ordine</button>
                    </form>
                </div>
            </div>
        </>
    )


}

export default CheckoutPage