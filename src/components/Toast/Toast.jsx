import { useState } from 'react'
import './Toast.css'
import { updateFirstVisit } from '../../utils/localStorage';

export default function Toast() {
    const [modalOpen, setModalOpen] = useState(true);
    return (
        <div className={`position-fixed z-10 start-0 end-0 top-0 bottom-0 bg-transparent-1-2 ${!modalOpen && 'd-none'}`}>

            <div className="position-relative h-100 w-100">
                <div className=" position-absolute w-100 h-100 top-50 start-50 translate-middle show" >

                    <div className={`modal fade ${modalOpen && 'show d-block'}`} >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Benvenuto!</h1>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setModalOpen(prev => !prev)
                                            updateFirstVisit()
                                        }}
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>Non perderti le ultime carte in arrivo! <br/>Iscriviti e ti aggiorniamo noi!</p>
                                </div>

                                <div className="modal-footer">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();

                                            const form = e.currentTarget;

                                            if (!form.checkValidity()) {
                                                e.stopPropagation();
                                            } else {
                                                updateFirstVisit();
                                                setModalOpen(prev => !prev);
                                            }

                                        }}
                                        class="row g-3 needs-validation"
                                        novalidate>

                                        <div class="col-md-4 w-100 mt-0">
                                            <label for="validationCustomUsername" class="form-label">Email</label>
                                            <div class="input-group has-validation">
                                                <input type="text"
                                                    class="form-control"
                                                    id="validationCustomUsername"
                                                    placeholder='esempio@gmail.com'
                                                    aria-describedby="inputGroupPrepend"
                                                    required />
                                                <div class="invalid-feedback">

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                                <label class="form-check-label" for="invalidCheck">
                                                    Accetta Info e Privacy
                                                </label>
                                                <div class="invalid-feedback">
                                                    I termini e condizioni sono obbligatori.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button
                                                class="btn btn-primary"
                                                type="submit"
                                               
                                            >Invia</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}