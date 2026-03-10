export default function Toast() {
    return (
        <>

            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                
                    <strong className="me-auto">e-card</strong>
                    
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">

                    <div>Benvenuto</div>
                    <span>inserisci la tua email</span>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>
                </div>
            </div>

        </>
    )
}