import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addToLocalStorage, getSearchFromLocalStorage, getSorterFromLocalStorage, isPresentInStorage, removeFromLocalStorage, saveCreditCardToLocalStorage } from '../utils/localStorage';

function AddPaymentMethodPage() {

    const navigate = useNavigate();

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

        saveCreditCardToLocalStorage("creditCardData", creditCardData);

        navigate("/checkout_page")
    }

    console.log(creditCardData);


    return (
        <>
            <h1 className="container mt-4">Metodo di pagamento</h1>
            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="card-owner-name-and-surname" className="form-label d-flex align-self-start">Nome e Cognome titolare della carta</label>
                    <input name="cardOwnerNameAndSurname" type="text" className="form-control" id="customer-name-and-surname" placeholder='Inserisci nome e cognome del proprietario della carta:' value={creditCardData.cardOwnerNameAndSurname} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="card-number" className="form-label d-flex align-self-start">Numero di carta </label>
                    <input name="cardNumber" type="text" className="form-control" id="phone" placeholder='Inserisci numero carta: ' value={creditCardData.cardNumber} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="card-expiry" className="form-label d-flex align-self-start">Mese e anno di scadenza </label>
                    <input name="cardExpiry" type="text" className="form-control" id="card-expiry" placeholder='Inserisci mese e anno di scadenza della carta: ' value={creditCardData.cardExpiry} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="card-CVV" className="form-label d-flex align-self-start">CVV della carta: </label>
                    <input name="cardCVV" type="text" className="form-control" id="card-CVV" placeholder='Inserisci il CVV della carta: ' value={creditCardData.cardCVV} onChange={handleChange} required />
                </div>


                <button type="submit" className="btn-checkout-page">Procedi con l'ordine</button>
            </form>

        </>
    )

}

export default AddPaymentMethodPage