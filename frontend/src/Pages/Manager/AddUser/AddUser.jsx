import React, { useState, useEffect } from 'react';
import AuthService from '../../../services/auth.service'
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        role: ''

    });
    const [errors, setErrors] = useState({});

    const { firstName, lastName, username, phone, email, address, password, role } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    // const [ageRangeFilter, setAgeRangeFilter] = useState("");

    // const handleAgeRangeFilterChange = (e) => {
    //     setAgeRangeFilter(e.target.value);
    //     filterClasses(e.target.value, serviceFilter, numChildrenFilter);
    // };

    const [selectedOption, setSelectedOption] = useState(formData.role);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setFormData({ ...formData, role: event.target.value });
     
    }
    
    const [message, setMessage] = useState();
    const [successful, setSuccessful] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here

        console.log("handle submit here");
        console.log(address);
        console.log(role);
        AuthService.addUser2(
            firstName, lastName, username, phone, email, address, password, role
        ).then(
            response => {
                toast.success("Add User successfully!");
                setMessage(response.data.message);
                setSuccessful(true);
                navigate('/userList');
            },
            error => {
                toast.error("Add User failed!");
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
                errors.firstName = 'Name can not contain special character.';
            }

            if (!lastName) {
                errors.lastName = '';
            } else if (!/^[a-zA-Z0-9]+$/.test(lastName)) {
                errors.lastName = 'Name can not contain special character.';
            }

            if (!username) {
                errors.username = '';
            } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
                errors.username = 'Name can not contain special character.';
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
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Add New User</h3>
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

                                        <div className="col-md-12 mb-4">

                                            <div className="form-outline">
                                                {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
                                                <input name="username" value={username} onChange={handleChange} placeholder="Username Name" type="text" id="username" className="form-control form-control-lg" required />
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

                                        <div className="col-md-12 mb-4">

                                            <div className="form-outline">
                                                {errors.address && <span>{errors.address}</span>}
                                                <input name="address" value={address} onChange={handleChange} placeholder="Address" type="text" id="address" className="form-control form-control-lg" required />
                                            </div>

                                        </div>
                                        <div className="col-md-12 mb-4">

                                            <div className="form-outline">
                                                {errors.password && <span>{errors.password}</span>}
                                                <input name="password" value={password} onChange={handleChange} placeholder="Password" type="text" id="password" className="form-control form-control-lg" required />
                                            </div>

                                        </div>
                                        <div className="col-md-12 mb-4">
                                            <div className="form-outline">
                                                <select  value={formData.role} onChange={handleOptionChange} name="role" className="form-control category-select" id="role">
                                               
                                                    <option value={'ROLE_USER'}>ROLE_USER</option>
                                                    <option value={'ROLE_MANAGER'}>ROLE_MANAGER</option>
                                                    <option value={'ROLE_ADMIN'}>ROLE_ADMIN</option>
                                                    <option value={'ROLE_STAFF'}>ROLE_STAFF</option>
                                                    <option value={'ROLE_DOCTOR'}>ROLE_DOCTOR</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-1">
                                        <button type="submit" className="btn btn-primary">Update</button>
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

export default AddUser;