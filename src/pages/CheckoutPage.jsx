import axios from "axios";
import { useState } from "react"

function CheckoutPage() {

    const endpoint = "http://localhost:3000/order"

    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const [order, setOrder] = useState({
        orderSlug: "",
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
        shippingCost: ""
    })

    function handleChange(e) {

        const { name, value } = e.target;

        setOrder(arrayTemp => ({
            ...arrayTemp,
            [name]: value
        }))

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const res = await axios.post(endpoint, order)
            // alert(`Ordine inviato! ID ordine: ${res.data.ordineId}`);

            setOrderId(res.data.ordineId);
            setShowSuccess(true);
        }
        catch (err) {
            console.error(err)
            alert("Errore di invio ordine")
        }
    }

    return (
        <>
            <div className="w-30 mt-5 py-4 px-3">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="order-slug" className="form-label d-flex align-self-start">Slug dell'ordine: </label>
                        <input name="orderSlug" type="text" className="form-control" id="order-slug" placeholder='Inserire slug ordine' value={order.orderSlug} onChange={handleChange} />
                    </div>

                    {/* campo nome utente */}
                    <div className="mb-3">
                        <label htmlFor="customer-name" className="form-label d-flex align-self-start">Inserisci il tuo nome: </label>
                        <input name="customerName" type="text" className="form-control" id="customer-name" placeholder='inserisci il tuo nome: ' value={order.customerName} onChange={handleChange} required />
                    </div>

                    {/* campo cognome utente */}
                    <div className="mb-3">
                        <label htmlFor="customer-surname" className="form-label d-flex align-self-start">Inserisci il tuo cognome: </label>
                        <input name="customerSurname" type="text" className="form-control" id="customer-surname" placeholder='inserisci il tuo cognome: ' value={order.customerSurname} onChange={handleChange} required />
                    </div>

                    {/* campo mail */}
                    <div className="mb-3">
                        <label htmlFor="customer-mail" className="form-label d-flex align-self-start">Inserisci la tua Email: </label>
                        <input name="customerMail" type="text" className="form-control" id="customer-mail" placeholder='Inserisci la tua Email: ' value={order.customerMail} onChange={handleChange} required />
                    </div>

                    {/* campo numero telefono utente */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label d-flex align-self-start">Inserisci il tuo numero di telefono: </label>
                        <input name="phone" type="text" className="form-control" id="phone" placeholder='Inserisci il tuo numero di telefono: ' value={order.phone} onChange={handleChange} />
                    </div>

                    {/* campo nome via utente */}
                    <div className="mb-3">
                        <label htmlFor="street-name" className="form-label d-flex align-self-start">Inserisci il tuo indirizzo di residenza: </label>
                        <input name="streetName" type="text" className="form-control" id="street-name" placeholder='Inserisci il tuo indirizzo di residenza: ' value={order.streetName} onChange={handleChange} required />
                    </div>

                    {/* campo numero civico utente */}
                    <div className="mb-3">
                        <label htmlFor="street-name-billing" className="form-label d-flex align-self-start">Inserisci il tuo indirizzo di fatturazione: </label>
                        <input name="streetNameBilling" type="text" className="form-control" id="street-name-billing" placeholder='Inserisci il tuo indirizzo di fatturazione: ' value={order.streetNameBilling} onChange={handleChange} />
                    </div>

                    {/* campo nome città utente */}
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label d-flex align-self-start">Inserisci la tua città di residenza: </label>
                        <input name="city" type="text" className="form-control" id="city" placeholder='Inserisci la tua città di residenza: ' value={order.city} onChange={handleChange} required />
                    </div>

                    {/* campo CAP utente */}
                    <div className="mb-3">
                        <label htmlFor="city-billing" className="form-label d-flex align-self-start">Inserisci la città di fatturazione: </label>
                        <input name="cityBilling" type="text" className="form-control" id="city-billing" placeholder='Inserisci la città di fatturazione: ' value={order.cityBilling} onChange={handleChange} />
                    </div>

                    {/* campo codice postale utente */}
                    <div className="mb-3">
                        <label htmlFor="postal-code" className="form-label d-flex align-self-start">Inserisci il tuo codice postale: </label>
                        <input name="postalCode" type="text" className="form-control" id="postal-code" placeholder='Inserisci il tuo codice postale: ' value={order.postalCode} onChange={handleChange} />
                    </div>

                    {/* campo numero codice postale utente */}
                    <div className="mb-3">
                        <label htmlFor="postal-code-billing" className="form-label d-flex align-self-start">Inserisci il tuo codice postale di fatturazione: </label>
                        <input name="postalCodeBilling" type="text" className="form-control" id="postal-code-billing" placeholder='Inserisci il tuo codice postale di fatturazione: ' value={order.postalCodeBilling} onChange={handleChange} />
                    </div>

                    {/* campo provincia utente */}
                    <div className="mb-3">
                        <label htmlFor="province" className="form-label d-flex align-self-start">Inserisci la provincia in cui abiti: </label>
                        <input name="province" type="text" className="form-control" id="province" placeholder='Inserisci la provincia in cui abiti: ' value={order.province} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="province" className="form-label d-flex align-self-start">Inserisci la tua provincia di fatturazione: </label>
                        <input name="provinceBilling" type="text" className="form-control" id="province" placeholder='Inserisci la tua provincia di fatturazione: ' value={order.provinceBilling} onChange={handleChange} />
                    </div>

                    {/* campo Paese/Nazione utente */}
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label d-flex align-self-start">Inserisci il paese in cui abiti: </label>
                        <input name="country" type="text" className="form-control" id="country" placeholder='Inserisci il paese in cui abiti: ' value={order.country} onChange={handleChange} />
                    </div>

                    {/* campo indirizzo di fatturazione */}
                    <div className="mb-3">
                        <label htmlFor="country-billing" className="form-label d-flex align-self-start">Inserisci il tuo indirizzo di fatturazione: </label>
                        <input name="countryBilling" type="text" className="form-control" id="country-billing" placeholder='Inserisci il tuo indirizzo di fatturazione: ' value={order.countryBilling} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shipping-cost" className="form-label d-flex align-self-start">Inserisci il costo di spedizione: </label>
                        <input name="shippingCost" type="text" className="form-control" id="shipping-cost" placeholder='Inserisci il costo di spedizione: ' value={order.shippingCost} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary d-flex align-self-start">Submit</button>
                </form>
            </div>

            {/* pop-up di conferma dell'ordine */}
            {showSuccess && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>Ordine inviato!</h2>
                        <p>Il tuo ordine è stato registrato.</p>
                        <p>ID ordine: <b>{orderId}</b></p>

                        <button
                            onClick={() => setShowSuccess(false)}
                            className="btn btn-success"
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default CheckoutPage