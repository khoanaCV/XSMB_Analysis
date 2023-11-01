import React from 'react';
import { Col, Container, NavLink, Row } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-bg">
            <Container>
                <Row className="justify-content-center text-white">
                    <Col xs={6} md={3}>
                        <div className="single-footer-widget">
                            <div className="widget-title">
                                <h2>Practices</h2>
                            </div>
                            <div className="widget-content">
                                <NavLink className="footer-link">For User</NavLink>
                                <NavLink className="footer-link">FAQ's</NavLink>
                                <NavLink className="footer-link">About</NavLink>
                                <NavLink className="footer-link">Contact Us</NavLink>
                                <NavLink className="footer-link">Blog</NavLink>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} md={3}>
                        <div className="single-footer-widget">
                            <div className="widget-title">
                                <h2>View Page</h2>
                            </div>
                            <div className="widget-content">
                                <NavLink className="footer-link">Homepage</NavLink>
                                <NavLink className="footer-link">S1</NavLink>
                                <NavLink className="footer-link">S2</NavLink>
                                <NavLink className="footer-link">S3</NavLink>
                                <NavLink className="footer-link">S4</NavLink>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} md={3}>
                        <div className="single-footer-widget">
                            <div className="widget-title">
                                <h2>Our Address</h2>
                            </div>
                            <div className="widget-content">
                                <NavLink className="footer-link">FPT University Hanoi</NavLink>
                                <NavLink className="footer-link">Km29, Thang Long Avenue, Hanoi</NavLink>
                                <NavLink className="footer-link">Email: sdn301mteam2@gmail.com</NavLink>
                                <NavLink className="footer-link">Fax: +(09)75 5867 340</NavLink>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copy-right text-center text-white">
                <p className='mb-0'>&copy; 2023 - <span className="developer">Team 2 - SDN301m</span> | All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;