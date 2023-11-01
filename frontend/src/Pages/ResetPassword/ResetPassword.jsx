import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [formData, setFormData] = useState({
        token: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const { token, password, confirmPassword } = formData;

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
        authService.resetPassword(
            token,
            password
        ).then(
            response => {
                setMessage(response.data.message);
                setSuccessful(true);
                navigate('/login');
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
            }
        );
    };


    useEffect(() => {
        const validateForm = () => {
            let errors = {};

            if (!password) {
                errors.password = 'Password is required';
            } else if (password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }

            if (!confirmPassword) {
                errors.confirmPassword = 'Confirm password is required';
            } else if (password !== confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }

            setErrors(errors);
        };

        validateForm();
    }, [formData]);


    return (
        <section className="vh-100 gradient-custom">
            <div className="container-fluid py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-md-9">
                        <div className="card shadow-2-strong card-registration" >
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Reset Password</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {(successful) ? <h4>password change successful</h4> : <h4>{message}</h4>}
                                        <div className="col-md-12 mb-4 pb-2">

                                            <div className="form-outline">
                                                {errors.token && <span>{errors.token}</span>}
                                                <input placeholder="Token" name="token" value={token} onChange={handleChange} type="token" id="oneTimeToken" className="form-control form-control-lg" required />
                                            </div>

                                        </div>
                                        <div className="col-md-12 mb-4 pb-2">

                                            <div className="form-outline">
                                                {errors.password && <span>{errors.password}</span>}
                                                <input name="password" value={password} onChange={handleChange} placeholder="Password" type="password" id="password" className="form-control form-control-lg" required />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mb-4 pb-2">

                                            <div className="form-outline">
                                                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                                                <input name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Re-Password" type="password" id="repassword" className="form-control form-control-lg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div classNameName="text-center">
                                        <button type="submit" className="btn btn-primary">Change</button>
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

export default ResetPassword;