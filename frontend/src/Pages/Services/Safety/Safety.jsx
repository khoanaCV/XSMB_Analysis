import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Safety.css';

const Safety = () => {
    return (
        <section className="about-content-sec">
            <Container>
                <Row>
                    <Col md={12} lg={8} className="text-center">
                        <div className="section-title">
                            <h1>Safety First</h1>
                        </div>
                        <p className="w-50 m-auto content-inner">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus accusantium minus in illo asperiores doloribus eligendi ad voluptatibus nam ut blanditiis quod laudantium corporis hic, dolores tempora aut veritatis!</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6}>
                        <div className="vedio-item">
                            <div className="vedio-bg-img">
                                <a href="https://www.youtube.com/watch?v=XqZsoesa55w"><FontAwesomeIcon icon={faPlayCircle} className="vedio-play-btn" /></a>
                            </div>
                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veritatis culpa debitis ut quae? Nam totam in repellendus nulla tempora amet, alias rem, ut veniam minima velit eius dolorum incidunt.</h5>
                        </div>
                    </Col>
                    <Col md={6} lg={6}>
                        <div className="vedio-item">
                            <div className="vedio-bg-img img2">
                                <a href="https://www.youtube.com/watch?v=dL3SP9t048Y"><FontAwesomeIcon icon={faPlayCircle} className="vedio-play-btn" /></a>
                            </div>
                            <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque id fugit error modi debitis quam quia vel ad itaque odio dolor, distinctio tempora dolorum maiores aliquam perferendis nihil cumque. Suscipit.</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Safety;