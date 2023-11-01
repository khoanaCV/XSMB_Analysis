import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import userService from "../../services/user.service";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState();
    const [originalService, setOriginalService] = useState();
    const { register, handleSubmit, setValue, errors } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getServiceDetail(id);
            setService(response.data);
            setOriginalService(response.data);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (service) {
            setValue("serviceTitle", service.serviceTitle);
            setValue("serviceDetail", service.serviceDetail);
            setValue("servicePrice", service.servicePrice);
        }
    }, [service, setValue]);

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append("serviceTitle", data.serviceTitle);
        formData.append("serviceDetail", data.serviceDetail);
        formData.append("servicePrice", data.servicePrice);
        try {
            await userService.postEditService(formData, id);
            toast.success("Service updated successfully.");
            navigate(`/service/${id}`)
        } catch (error) {
            toast.error("Error updating service.");
        }
    };

    return (
        <Container>
            <h1>Edit Service</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formServiceTitle">
                    <Form.Label>Serivce Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter service title"
                        {...register("serviceTitle", { required: true })}
                    />
                    {errors?.serviceTitle && (
                        <Form.Text className="text-danger">
                            This field is required
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group controlId="formServiceDetail">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter service description"
                        {...register("serviceDetail", { required: true })}
                    />
                    {errors?.serviceDetail && (
                        <Form.Text className="text-danger">
                            This field is required
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group controlId="formServicePrice">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter service price"
                        {...register("servicePrice", { required: true })}
                    />
                    {errors?.servicePrice && (
                        <Form.Text className="text-danger">
                            This field is required
                        </Form.Text>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
};

export default EditServiceDetail;