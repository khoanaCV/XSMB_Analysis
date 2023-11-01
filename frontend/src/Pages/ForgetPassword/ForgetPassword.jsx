import "./ForgetPassword.css"
import React, { useState } from 'react';
import authService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [formData, setFormData] = useState(
    ''
  );

  const [errors, setErrors] = useState({});

  const { email } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState();
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handle submit here " + email);
    authService.forgotPassword(email).then(
      response => {
        console.log(response);
        setMessage(response.data.message);
        setSuccessful(true);
        navigate('/resetpassword');
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);

        console.log(resMessage);
      }
    );

  };
  return (

    <section className="vh-100 gradient-custom">
      <div className="container-fluid py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-9">
            <div className="card shadow-2-strong card-registration" >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Forget Password</h3>
                <form onSubmit={handleSubmit}>

                  <h6>Please enter the email to verify your account</h6>
                  {(successful) ? "" : <h4>{message}</h4>}
                  <div className="row">
                    <div className="col-md-12 mb-4 pb-2">

                      <div className="form-outline">
                        {errors.email && <span>{errors.email}</span>}
                        <input placeholder="Email" name="email" value={email} onChange={handleChange} type="email" id="emailAddress" className="form-control form-control-lg" required />
                      </div>

                    </div>
                  </div>
                  <div classNameName="text-center">
                    <button type="submit" className="btn btn-primary">Sent</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;