import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlayNumber = () => {
    return (
        <Container>
            <Row>
                <Col md={12} lg={12} sm={12}>
                    <div className="text-left">
                        <h1>Dự Đoán Kết Quả</h1>
                    </div>
                    
                        
                </Col>

                <Col md={12} lg={12} sm={12} className="text-center mb-5">
                    <Link to="/"><button className="btn btn-warning">Go Back</button></Link>
                </Col>
            </Row>
        </Container>
    );
};

export default PlayNumber;