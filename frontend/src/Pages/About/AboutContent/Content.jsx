import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Content.css';

const Content = () => {
    return (
        <section className="about-content-sec">
            <Container>
                <Row>
                    <Col md={12} lg={8} className="text-center">
                        <div className="section-title">
                            <h1>Some information about</h1>
                            <h2>This is our Northern Vietnam Lottery Statistics And Analysis Website</h2>
                        </div>
                        <p className="w-50 m-auto content-inner">The Northern Lottery (XSKT) is the first type of lottery issued by the State in Vietnam
                        and is under the management of the Ministry of Finance.To date,
                        Northern Lottery has experienced more than 60 years of development in Vietnam.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Content;