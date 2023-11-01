import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './Services.css';

const Services = (props) => {

    const {serviceTitle, serviceDetail} = props.service;
    useEffect(() => {
        AOS.init({
                duration: 2000,
            });
        AOS.refresh();
      }, []);
    return (
        <>
            <Col md={6} lg={6} xl={4} xs={12}>
                <div className="single-service-box" data-aos="flip-left">
                    <h3>{serviceTitle}</h3>
                    <p>{serviceDetail}</p>
                </div>
            </Col>
        </>
    );
};

export default Services;