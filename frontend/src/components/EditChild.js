import React, { useState, useEffect } from 'react';
import { useHistory, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import userService from '../services/user.service';
import useForm from '../hooks/useForm';

const EditChild = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [child, setChild] = useState({});
    const [classInfo, setClassInfo] = useState({});
    const { values, handleChange, handleSubmit } = useForm(updateChild);

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getChildInfo(id);
            setChild(response.data);
            console.log(response.data);
            handleChange({ target: { name: 'firstName', value: child.firstName } });
            handleChange({ target: { name: 'lastName', value: child.lastName } });
            handleChange({ target: { name: 'dob', value: child.dob } });
            handleChange({ target: { name: 'status', value: child.status } });
            handleChange({ target: { name: 'gender', value: child.gender } });
            handleChange({ target: { name: 'interest', value: child.interest } });
            handleChange({ target: { name: 'needs', value: child.needs } });
            handleChange({ target: { name: 'note', value: child.note } });
            handleChange({ target: { name: 'medications', value: child.medications } });
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getChildInfo(id);
            setClassInfo(response.data);
        }
        fetchData();
    }, [id]);

    async function updateChild() {
        await userService.updateChild(id, values);
        history(`/child/${id}`);
    }

    return (
        <div className="container">
            <h1>Edit Child</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        value={values.firstName || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        value={values.lastName || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter date of birth"
                        name="dob"
                        value={values.dob || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={values.status || ''}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        name="gender"
                        value={values.gender || ''}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="interest">
                    <Form.Label>Interest</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter interest"
                        name="interest"
                        value={values.interest || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="needs">
                    <Form.Label>Needs</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter needs"
                        name="needs"
                        value={values.needs || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="note">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter note"
                        name="note"
                        value={values.note || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="medications">
                    <Form.Label>Medications</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter medications"
                        name="medications"
                        value={values.medications || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditChild;