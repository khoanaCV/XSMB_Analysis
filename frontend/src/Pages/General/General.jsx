import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const General = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col md={12} lg={12} sm={12} className="text-center mb-5">
                    <div className="section-title mt-5">
                        <h1>Thống Kê Tổng Hợp</h1>
                    </div>
                </Col>
                <Col>
                    <div>
                    Bảng số Top ngày:&nbsp;<input type="date"></input>


                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default General;