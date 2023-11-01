import React from "react";
import "./Payment.css";

const Payment = () =>{
    return (
        <section classNameName="p-4 p-md-5 sect">
  <div className="row d-flex justify-content-center m-5">
    <div className="col-md-10 col-lg-8 col-xl-5">
      <div className="card rounded-3">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3>Settings</h3>
            <h6>Payment</h6>
          </div>
          <form action="">
            <p className="fw-bold mb-4 pb-2">Saved cards:</p>

            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img alt="" className="img-fluid mt-4" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
              <div className="flex-fill ">
                <div className="form-outline">
                <label className="form-label" for="formControlLgXc">Card Number</label>
                  <input type="text" id="formControlLgXc" className="form-control form-control-lg"
                    value="**** **** **** 3193" />
                 
                </div>
              </div>
             
            </div>

            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img alt="" className="img-fluid mt-4" src="https://img.icons8.com/color/48/000000/visa.png" />
              <div className="flex-fill">
                <div className="form-outline">
                <label className="form-label" for="formControlLgXs">Card Number</label>
                  <input type="text" id="formControlLgXs" className="form-control form-control-lg"
                    value="**** **** **** 4296" />
                
                </div>
              </div>
            
            </div>

            <p className="fw-bold mb-4">Add new card:</p>

            <div className="form-outline mb-4">
            <label className="form-label" for="formControlLgXsd">Cardholder's Name</label>
              <input type="text" id="formControlLgXsd" className="form-control form-control-lg"
                value="Anna Doe" />
             
            </div>

            <div className="row mb-4">
              <div className="col-7">
                <div className="form-outline">
                <label className="form-label" for="formControlLgXM">Card Number</label>
                  <input type="text" id="formControlLgXM" className="form-control form-control-lg"
                    value="1234 5678 1234 5678" />
                 
                </div>
              </div>
              <div className="col-3">
                <div className="form-outline">
                <label className="form-label" for="formControlLgExpk">Expire</label>
                  <input type="password" id="formControlLgExpk" className="form-control form-control-lg"
                    placeholder="MM/YYYY" />
                  
                </div>
              </div>
              <div className="col-2">
                <div className="form-outline">
                <label className="form-label" for="formControlLgcvv">Cvv</label>
                  <input type="password" id="formControlLgcvv" className="form-control form-control-lg"
                    placeholder="Cvv" />
                 
                </div>
              </div>
            </div>

            <button className="btn btn-success btn-lg btn-block">Add card</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}

export default Payment;