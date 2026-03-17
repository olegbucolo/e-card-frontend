import axios from "axios";
import { useState, useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom";

function CheckoutPage() {
    const { indexProducts, cartProducts, setCartProducts } = useOutletContext()

    // useEffect(() => {console.log('index products" ', indexProducts)}, [indexProducts])
    const [submitted, setSubmitted] = useState(false);

    const [newOrderId, setnewOrderId] = useState();

    const firstproduct = "1";
    const secondProduct = "2";

    const endpoint = "http://localhost:3000/orders"
    const endpointMail = "http://localhost:3000/order"

    let orderShippingCost;


    const endpoint1 = "http://localhost:3000/orderproduct"

    const totalPrice = cartProducts.reduce((total, item) => {
        const product = indexProducts.find(
            p => p.id == item.id);
        if (!product) return total;
        return total + (product.price * item.quantity);
    }, 0)

    if (totalPrice > 40) {
        orderShippingCost = 0;
    } else {
        orderShippingCost = 5;
    }

    const [order, setOrder] = useState({
        orderSlug: `ordine-pokemon-${newOrderId}`,
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

    const [orderProductsBind, setOrderProductBind] = useState({
        newOrderId: "",
        productsId: "",
        unitQuantity: "",
        unitPrice: ""
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
        setSubmitted(true);

        if (!order.customerName || !order.customerSurname || !order.customerMail || !order.streetName || !order.city) {
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

            const res = await axios.post(endpoint, order)

            const orderId = res.data.id

            alert(`Ordine inviato! ID ordine: ${orderId}`);

            setnewOrderId(orderId)

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

                    await axios.post(endpoint1, orderProductData)

                    console.log(orderProductData)
                }
            }

            console.log(orderId)

            await axios.post(endpointMail, {
                order,
                products
            })

            } catch (err) {
                console.error(err)
                alert("Errore di invio ordine")
            }
}

console.log(newOrderId);

console.log(orderShippingCost);




return (
    <>

        <div className="container pt-3">

            <div className="d-flex">
                <div className="order-container-left">

                    {
                        cartProducts.map(item => {
                            const product = indexProducts.find(
                                p => p.id == item.id
                            )
                            if (!product) return
                            return (

                                <div className="d-flex border-cart my-5" key={item.id}>

                                    <div className="card" style={{ width: "10rem" }}>

                                        <img src={product.image} className="card-img-top" alt="" />

                                    </div>

                                    <div className="product-detail">


                                        <h3>{product.title}</h3>

                                        <p className="avaible-text">{product.is_featured === 1 ? "Available" : "Not avaible"}</p>

                                        <p>Quantity: {item.quantity}</p>

                                        <p>Price: {product.price}</p>


                                    </div>
                                </div>
                            )
                        }
                        )

                    }

                </div>

                <div className="price-box container my-5">
                    <p>Shipping cost: {orderShippingCost} €</p>
                    <button className="btn-checkout-page">Total Price: {totalPrice} €</button>
                </div>

            </div>

        </div>
        <div className="w-30 mt-5 py-4 px-3 checkout-container">
            <form onSubmit={handleSubmit} className="checkout-form">

                <div className="mb-3">
                    <label htmlFor="order-slug" className="form-label d-flex align-self-start">Slug dell'ordine: </label>
                    <input name="orderSlug" type="text" className="form-control" id="order-slug" placeholder='Inserire slug ordine' value={order.orderSlug} onChange={handleChange} />
                </div>

                {/* campo nome utente */}
                <div className="mb-3">
                    <label htmlFor="customer-name" className="form-label d-flex align-self-start">Inserisci il tuo nome: </label>
                    <input name="customerName" type="text" className={submitted && !order.customerName ? "input-error" : "form-control"} id="customer-name" placeholder='inserisci il tuo nome: ' value={order.customerName} onChange={handleChange} required />
                </div>

                {/* campo cognome utente */}
                <div className="mb-3">
                    <label htmlFor="customer-surname" className="form-label d-flex align-self-start">Inserisci il tuo cognome: </label>
                    <input name="customerSurname" type="text" className={submitted && !order.customerSurname ? "input-error form-control" : "form-control"} id="customer-surname" placeholder='inserisci il tuo cognome: ' value={order.customerSurname} onChange={handleChange} required />
                </div>

                {/* campo mail */}
                <div className="mb-3">
                    <label htmlFor="customer-mail" className="form-label d-flex align-self-start">Inserisci la tua Email: </label>
                    <input name="customerMail" type="text" className={submitted && !order.customerMail ? "input-error form-control" : "form-control"} id="customer-mail" placeholder='Inserisci la tua Email: ' value={order.customerMail} onChange={handleChange} required />
                </div>

                {/* campo numero telefono utente */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label d-flex align-self-start">Inserisci il tuo numero di telefono: </label>
                    <input name="phone" type="text" className="form-control" id="phone" placeholder='Inserisci il tuo numero di telefono: ' value={order.phone} onChange={handleChange} />
                </div>

                {/* campo nome via utente */}
                <div className="mb-3">
                    <label htmlFor="street-name" className="form-label d-flex align-self-start">Inserisci il tuo indirizzo di residenza: </label>
                    <input name="streetName" type="text" className={submitted && !order.streetName ? "input-error form-control" : "form-control"} id="street-name" placeholder='Inserisci il tuo indirizzo di residenza: ' value={order.streetName} onChange={handleChange} required />
                </div>

                {/* campo numero civico utente */}
                <div className="mb-3">
                    <label htmlFor="street-name-billing" className="form-label d-flex align-self-start">Inserisci il tuo indirizzo di fatturazione: </label>
                    <input name="streetNameBilling" type="text" className="form-control" id="street-name-billing" placeholder='Inserisci il tuo indirizzo di fatturazione: ' value={order.streetNameBilling} onChange={handleChange} />
                </div>

                {/* campo nome città utente */}
                <div className="mb-3">
                    <label htmlFor="city" className="form-label d-flex align-self-start">Inserisci la tua città di residenza: </label>
                    <input name="city" type="text" className={submitted && !order.city ? "input-error form-control" : "form-control"} id="city" placeholder='Inserisci la tua città di residenza: ' value={order.city} onChange={handleChange} required />
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

                <button type="submit" className="btn btn-checkout-page d-flex align-self-start">Procedi con l'ordine</button>
            </form>
        </div>
    </>
)

}

export default CheckoutPage