import "./Login.css";
import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("handle submit here");
    AuthService.login(email, password).then(
      (response) => {
        toast.success("Login successfully!");
        navigate("/home");
      },
      (error) => {
        toast.error("Login failed!");
      }
    );
  };

  useEffect(() => {
    const validateForm = () => {
      let errors = {};

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
                  Login Form
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-2 pb-2">
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
                  <div className="col-md-12 mb-2 pb-2">
                    <div className="form-outline">
                      {errors.password && (
                        <span style={{ color: "red" }}>{errors.password}</span>
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
                  <div className="text-end">
                    <a
                      className="text-muted text-decoration-none"
                      href="/forgetPassword"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="mt-1 text-center">
                    <p>
                      Don't have an account?
                      <button type="button" className="btn btn-outline-danger">
                        <a style={{ textDecoration: "None" }} href="/register">
                          Register
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

export default Login;
