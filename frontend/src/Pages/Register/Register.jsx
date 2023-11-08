import "./Register.css";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { email, password, confirmPassword, name } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("handle submit here");
    AuthService.register(name, email, password).then(
      (response) => {
        toast.success("Register successfully!");
        navigate("/login");
      },
      (error) => {
        toast.error("Register failed!");
      }
    );
  };

  useEffect(() => {
    const validateForm = () => {
      let errors = {};

      if (!name) {
        errors.name = "";
      } else if (name.length < 3) {
        errors.name = "Name must be at least 3 characters.";
      }

      if (!email) {
        errors.email = "";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }

      if (!password) {
        errors.password = "";
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      }

      if (!confirmPassword) {
        errors.confirmPassword = "";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
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
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                  Register Form
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        {errors.name && (
                          <span style={{ color: "red" }}>{errors.name}</span>
                        )}
                        <input
                          name="name"
                          value={name}
                          onChange={handleChange}
                          placeholder="Name"
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12 mb-4 pb-2">
                      <div className="form-outline">
                        {errors.email && (
                          <span style={{ color: "red" }}>{errors.email}</span>
                        )}
                        <input
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        {errors.password && (
                          <span style={{ color: "red" }}>
                            {errors.password}
                          </span>
                        )}
                        <input
                          name="password"
                          value={password}
                          onChange={handleChange}
                          placeholder="Password"
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        {errors.confirmPassword && (
                          <span style={{ color: "red" }}>
                            {errors.confirmPassword}
                          </span>
                        )}
                        <input
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-Password"
                          type="password"
                          id="repassword"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                  <div className="mt-1 text-center">
                    <p>
                      Already Have An Account?
                      <button type="button" className="btn btn-outline-danger">
                        <a style={{ textDecoration: "None" }} href="/login">
                          Login
                        </a>
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
};

export default Register;
