import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FakeService } from '../../FakeData/Treatment';
import { Link } from 'react-router-dom';
import serviceDetailImg from '../../Images/service-details-promo1.png';
import Services from '../../Pages/Home/Services/Services';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';
const Service = () => {


    const [services, setServices] = useState([]);

    const [isUser, setIsUser] = useState(false);
    const [currentUser, setCurrentUser] = useState();


    useEffect(() => {
        async function fetchData() {
            const response = await userService.getAllService();
            console.log(response.data)
            setServices(response.data);
        }
        fetchData();

        const user = authService.getCurrentUser();
        if (user) {
            setIsUser(user.roles.includes("ROLE_USER"));
            setCurrentUser(user)
        }

    }, []);
    return (
        <section className="service-wrapper">
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="section-title text-center">
                            <h1>Phân Phối Xác Suất</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        services.map(service => (
                            <Services key={service.id} service={service} />
                        ))
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Service;