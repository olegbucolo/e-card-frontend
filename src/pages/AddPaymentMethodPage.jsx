import { useState } from "react"

function AddPaymentMethodPage() {

    const [creditCardData, setCreditCardData] = useState({
        cardOwnerNameAndSurname: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVV: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setCreditCardData(arrayTemp => ({
            ...arrayTemp,
            [name]: value
        }))

    }


    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>

            <div className="mb-3">
                <label htmlFor="card-owner-name-and-surname" className="form-label d-flex align-self-start">Inserisci nome e cognome del proprietario della carta: </label>
                <input name="cardOwnerNameAndSurname" type="text" className={submitted && !order.customerName ? "input-error" : "form-control"} id="customer-name-and-surname" placeholder='Inserisci nome e cognome del proprietario della carta:' value={order.customerName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="card-number" className="form-label d-flex align-self-start">Inserisci numero carta: </label>
                <input name="cardNumber" type="text" className="form-control" id="phone" placeholder='Inserisci numero carta: ' value={order.phone} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="card-expiry" className="form-label d-flex align-self-start">Inserisci mese e anno di scadenza della carta: </label>
                <input name="cardExpiry" type="text" className={submitted && !order.customerSurname ? "input-error form-control" : "form-control"} id="card-expiry" placeholder='Inserisci mese e anno di scadenza della carta: ' value={order.customerSurname} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="card-CVV" className="form-label d-flex align-self-start">Inserisci il CVV della carta: </label>
                <input name="cardCVV" type="text" className={submitted && !order.customerMail ? "input-error form-control" : "form-control"} id="card-CVV" placeholder='Inserisci il CVV della carta: ' value={order.customerMail} onChange={handleChange} required />
            </div>

        </>
    )

}

export default AddPaymentMethodPage