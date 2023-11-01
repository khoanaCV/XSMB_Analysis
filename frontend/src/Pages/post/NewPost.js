import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import userService from '../../services/user.service';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const navigate = useNavigate();
    const [previews, setPreviews] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [sizeError, setSizeError] = useState('')

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.images) {
            for (const image of data.images) {
                formData.append('images', image);
            }
        }
        try {
            const response = await axios.post('http://localhost:8080/api/post/create', formData, { headers: authHeader() });
            setSuccessMessage('Post submitted successfully!');
            setErrorMessage(null);
            setTimeout(() => {
                navigate('/posts');
            }, 2000);

        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            }
            else {
                setErrorMessage('An error occurred while submitting the form. ' + error.response.data.message);
            }
            setSuccessMessage(null);
            console.log(error.response.data.message)
        }
    };

    const onDrop = (acceptedFiles, fileRejections) => {
        setValue('images', acceptedFiles);
        setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
        if (fileRejections.length > 0) {
            setSizeError('File is too large. Maximum size allowed is 10MB.')
        } else {
            setSizeError('')
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxSize: 10485760, multiple: true });

    const handleRemoveImage = (index) => {
        setValue('images', (prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setSizeError('');
    };

    return (
        <div>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className='container mt-5 mb-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input {...register('title', { required: true })} id="title" className="form-control" />
                    {errors.title && <p className="text-danger">Title is required</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea {...register('content', { required: true })} id="content" className="form-control" />
                    {errors.content && <p className="text-danger">Content is required</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Images</label>
                    <div {...getRootProps()} className="border p-2">
                        <input {...getInputProps()} />
                        <p>Choose an image, or drag 'n' drop multiple images here</p>
                    </div>
                    <div>
                        {sizeError && <p className="alert alert-danger">{sizeError}</p>}
                    </div>
                    <div className="d-flex flex-wrap mt-2">
                        {previews.map((preview, index) => (
                            <div key={index} className="me-2 mb-2 position-relative">
                                <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100px' }} />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="btn btn-danger btn-sm position-absolute top-0 end-0">x</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
export default NewPost;