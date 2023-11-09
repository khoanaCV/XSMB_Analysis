import { faEnvelope, faHome, faPhone, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <section className="contactUs-wrapper">
            <Container>
                <Row>
                    <Col md={6} lg={6} xl={4}>
                        <div className="single-contact icon1">
                            <div className="c-icon">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                            <div className="c-info text-start">
                                <h4>Address</h4>
                                <p>FPT University Hanoi</p>
                                <p>Km29, Thang Long Avenue, Hanoi</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={6} xl={4}>
                        <div className="single-contact icon2">
                            <div className="c-icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="c-info text-start">
                                <h4>Email</h4>
                                <p>sdn301mteam2@gmail.com</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={6} xl={4}>
                        <div className="single-contact icon3">
                            <div className="c-icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="c-info text-start">
                                <h4>Phone</h4>
                                <p>(888) 4421-1238-32</p>
                                <p>(888) 838-1238-645</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={10} lg={10} xl={10}>
                        <div className="single-contact icon3">
                            <div className="c-icon">
                                <FontAwesomeIcon icon={faQrcode} />
                            </div>
                            <div className="c-info text-center">
                                <h4>Donate</h4>
                                <img src="https://cdn.tgdd.vn/hoi-dap/1309185/ma-qr-code-la-gi-dung-de-lam-gi-cach-tao-ma-qr-nhanh-chong%20(1).jpg" alt="" class="rounded"></img>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactUs;