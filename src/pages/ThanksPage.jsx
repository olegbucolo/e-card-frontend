
import './ThanksPage.css'
import { FaRegFaceSmileBeam } from "react-icons/fa6";

export default function ThanksPage(){
    return (
        <>
            <div className="container my-5 pt-5 bg-light">
                <div className="d-flex">
                    <div className="left-side fs-2">
                        <div><h1>Grazie per aver acquistato da noi !</h1></div>
                        <div><p>Il tuo ordine e' stato ricevuto. Ti arrivera' un email con tutti i dettagli all'indirizzo fornito</p></div>
                    </div>
                    <div className="ms-5 right-side">
                        <FaRegFaceSmileBeam className="fs-10"/>
                    </div>
                </div>
            </div>
        </>
    )
}