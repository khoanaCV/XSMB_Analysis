import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import { Link } from 'react-router-dom';

const ServiceDetail = () => {

    const { id } = useParams();

    const [service, setService] = useState({});

    const [isUser, setIsUser] = useState(false);
    const [isMod, setIsMod] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getServiceDetail(id);
            setService(response.data);
        }
        fetchData();

        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user)
            setIsUser(user.roles.includes("ROLE_USER"));
            setIsMod(user.roles.includes("ROLE_MANAGER"))
        }
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">{service.serviceTitle}</h3>
            <p className="text-gray-600 mb-4">{service.serviceDetail}</p>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="font-medium">Price:</p>
                    <p className="ml-2">${service.servicePrice}</p>
                </div>
                <div>
                    <p className="font-medium">Created Date:</p>
                    <p className="ml-2">{service.createdDate}</p>
                </div>
            </div>

            <div className="flex justify-end">
                {isUser && (
                    <Link to={`/booking/${service.id}`} className="link-button mr-4">Book this Service</Link>
                )}

                {isMod && (
                    <Link to={`/editservice/${service.id}`} className="link-button">Edit Service</Link>
                )}
            </div>
        </div>
    );
};

export default ServiceDetail;