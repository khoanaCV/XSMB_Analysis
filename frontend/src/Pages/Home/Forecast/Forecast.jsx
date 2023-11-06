import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Forecast = () => {
    return (
        <Container>
            <Row>
                <Col md={12} lg={12} sm={12}>
                    <div className="text-left">
                        <h1>Dự Đoán Kết Quả</h1>
                    </div>
                    
                    <div class="p-3 mb-2 bg-secondary text-white">Dự đoán Poisson cho ngày 03/10/2023
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                    Numbers
                                    <div>
                                        <button type="button" class="btn btn-primary"> 88 <span class="badge badge-light">1</span></button>
                                        <button type="button" class="btn btn-danger"> 12 <span class="badge badge-light"></span></button>
                                        <button type="button" class="btn btn-primary"> 43 <span class="badge badge-light">3</span></button>
                                        <button type="button" class="btn btn-danger"> 33 <span class="badge badge-light"></span></button>
                                        <button type="button" class="btn btn-primary"> 54 <span class="badge badge-light">1</span></button>
                                    </div>
                                    
                                </div>
                                <div class="col-sm">
                                    Chart
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="p-3 mb-2 bg-info text-white">Dự đoán Gaussian cho ngày 03/10/2023
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                    Numbers
                                    <div>
                                        <button type="button" class="btn btn-primary"> 88 <span class="badge badge-light">1</span></button>
                                        <button type="button" class="btn btn-danger"> 12 <span class="badge badge-light"></span></button>
                                        <button type="button" class="btn btn-primary"> 43 <span class="badge badge-light">3</span></button>
                                        <button type="button" class="btn btn-danger"> 33 <span class="badge badge-light"></span></button>
                                        <button type="button" class="btn btn-primary"> 54 <span class="badge badge-light">1</span></button>
                                    </div>
                                </div>
                                <div class="col-sm">
                                    Chart
                                </div>

                            </div>
                        </div>

                    </div>

                </Col>

                <Col md={12} lg={12} sm={12} className="text-center mb-5">
                    <Link to="/"><button className="btn btn-warning">Go Back</button></Link>
                </Col>
            </Row>
        </Container>
    );
};
export default Forecast;