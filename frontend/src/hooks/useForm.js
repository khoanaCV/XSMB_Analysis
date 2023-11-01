import { useState } from 'react';

const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return {
        values,
        handleChange,
        handleSubmit,
    };
};

export default useForm;