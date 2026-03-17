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
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Povero = ricco</h1>
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
                                <div className="modal-body">
                                    Tu povero. Povero Entra email. Povero ricco.
                                </div>
                                <div className="input-group px-3 mb-3">
                                    <input type="text" className="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">@gmail.com</span>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        onClick={() => {
                                            setModalOpen(prev => !prev)
                                            updateFirstVisit()
                                        }}
                                        type="button"
                                        className="btn btn-primary">Iscriviti alla newsletter!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}