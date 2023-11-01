import "./Register.css"
import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''

  });
  const [errors, setErrors] = useState({});

  const { firstName, lastName, username, phone, email, password, confirmPassword, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState();
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here

    console.log("handle submit here");
    AuthService.register(
      firstName, lastName, username, phone, email, password, address
    ).then(
      response => {
        toast.success("Regiter successfully!");
        setMessage(response.data.message);
        setSuccessful(true);
        navigate('/login');
      },
      error => {
        toast.error("Update user info failed!");
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  useEffect(() => {
    const validateForm = () => {
      let errors = {};

      if (!firstName) {
        errors.firstName = '';
      } else if (!/^[a-zA-Z0-9]+$/.test(firstName)) {
        errors.firstName = 'Firstname can not contain special character.';
      }

      if (!lastName) {
        errors.lastName = '';
      } else if (!/^[a-zA-Z0-9]+$/.test(lastName)) {
        errors.lastName = 'Lastname can not contain special character.';
      }

      if (!username) {
        errors.username = '';
      } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.username = 'Username can not contain special character.';
      }

      if (!phone) {
        errors.phone = '';
      } else if (!/^[0-9]+$/.test(phone)) {
        errors.phone = 'Phone number must only contain digits';
      }

      if (!email) {
        errors.email = '';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
      }

      if (!password) {
        errors.password = '';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      if (!confirmPassword) {
        errors.confirmPassword = '';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (!address) {
        errors.address = '';
      } else if (!/^[a-zA-Z0-9\s]+$/.test(address)) {
        errors.address = 'Address can not contain special character.';
      }

      setErrors(errors);
    };

    validateForm();
  }, [formData]);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container-fluid py-5 h-100">
        <ToastContainer />
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-9">
            <div className="card shadow-2-strong card-registration" >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Registration Form</h3>
                <form onSubmit={handleSubmit}>

                  <div className="row">
                    <div className="col-md-12 mb-4">

                      <div className="form-outline">
                        {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
                        <input name="firstName" value={firstName} onChange={handleChange} placeholder="First Name" type="text" id="firstName" className="form-control form-control-lg" required />
                      </div>

                    </div>

                    <div className="col-md-12 mb-4">

                      <div className="form-outline">
                        {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
                        <input name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" type="text" id="lastName" className="form-control form-control-lg" required />
                      </div>

                    </div>

                    <div className="col-md-12 mt-4 mb-4">

                      <div className="form-outline">
                        {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
                        <input name="username" value={username} onChange={handleChange} placeholder="Username" type="text" id="username" className="form-control form-control-lg" required />
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="femaleGender" value="female" defaultChecked />
                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" />
                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                        <input placeholder="Email" name="email" value={email} onChange={handleChange} type="email" id="emailAddress" className="form-control form-control-lg" required />
                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                        <input placeholder="Phone Number" name="phone" value={phone} onChange={handleChange} type="tel" id="phoneNumber" className="form-control form-control-lg" required />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mb-4">

                    <div className="form-outline">
                      {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
                      <input name="address" value={address} onChange={handleChange} placeholder="Address" type="text" id="address" className="form-control form-control-lg" required />
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                        <input name="password" value={password} onChange={handleChange} placeholder="Password" type="password" id="password" className="form-control form-control-lg" required />
                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
                        <input name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Re-Password" type="password" id="repassword" className="form-control form-control-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
                  <div className="mt-1 text-center">
                    <p>Already Have An Account?
                      <button type="button"
                        className="btn btn-outline-danger">
                        <a style={{ textDecoration: 'None' }} href="/login">Login</a>
                      </button>
                    </p>
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

export default Register;