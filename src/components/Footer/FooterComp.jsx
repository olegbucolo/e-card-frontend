import facebook from "../../imgs/footer-img/facebook.png";
import instagram from "../../imgs/footer-img/instagram.png";
import twitter from "../../imgs/footer-img/twitter.png";
import whatsapp from "../../imgs/footer-img/social.png";

export default function FooterComp() {
    return (
        <footer className="site-footer bg-dark text-light py-5">
            <div className="container">

                <div className="row">

                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">E-Cards</h5>
                        <p className="text-secondary">
                            Il tuo shop online per carte collezionabili rare e prodotti per
                            veri collezionisti.
                        </p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Link utili</h6>

                        <ul className="list-unstyled text-secondary">
                            <li>Home</li>
                            <li>Prodotti</li>
                            <li>Wishlist</li>
                            <li>Contatti</li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Seguici</h6>

                        <div className="d-flex gap-3 mt-3 social-icons">

                            <img src={facebook} alt="facebook" />

                            <img src={instagram} alt="instagram" />

                            <img src={twitter} alt="twitter" />

                            <img src={whatsapp} alt="whatsapp" />

                        </div>

                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center text-secondary small">
                    © 2026 E-Cards - Tutti i diritti riservati
                </div>

            </div>
        </footer>
    );
}