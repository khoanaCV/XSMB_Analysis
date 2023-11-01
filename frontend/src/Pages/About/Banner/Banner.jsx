import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import './Banner.css';
const Banner = () => {
    return (
        <section className="banner-all text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} lg={6} sm={12}>
                        <div className="section-title">
                            <h1>About Us</h1>
                        </div>
                        <div className="breadcrumb-nav">
                            <a href="/" className="text-decoration-none text-white">Home Page</a>
                            <span href="/" className="text-decoration-none text-white ml-2">About Us</span>
                        </div>
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;