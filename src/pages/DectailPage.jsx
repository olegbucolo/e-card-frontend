import dragon from "../imgs/dragoBianco.png"

export default function DectailPage() {
    return (
        <>
            <h2>Info prodotto</h2>

            <div className="container mt-3">
                <div className="d-flex">

                    <div className="l-box-d">
                        <img src={dragon} alt="" className="img-dectail-page" />

                    </div>






                    <div className="r-box-d">

                        <h4>Drago Bianco Occhi Blu</h4>

                        <p>stato: nuovo</p>

                        <p>prezzo: 1€</p>

                        <div><button className="btn btn-warning">Inserisci nel carrello</button></div>
                    </div>


                </div>
            </div>



        </>
    )
}