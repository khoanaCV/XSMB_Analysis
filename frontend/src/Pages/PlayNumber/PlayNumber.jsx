import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlayNumber = () => {
    return (
        <Container>
            <Row>
                <Col md={12} lg={12} sm={12}>
                    <div className="text-left">
                        <h1>Ghi Số</h1>
                    </div>
                    
                        <p class="font-weight-bold"><a href="#" class="text-primary">Lưu ý:</a>Ghi lô ở đây không sử dụng tiền thật 
                        <a href="#" class="text-primary">[Tìm hiểu thêm]</a></p>
                    
                    <div>
                        <label htmlFor="myTextBox">Ngày ghi: </label> <input type="date" id="myTextBox" /> <br></br>
                        <label htmlFor="myTextBox">Cặp số: </label> <input type="text" id="myTextBox" />
                        <label htmlFor="myTextBox">Số điểm: </label> <input type="text" id="myTextBox" />
                        <button className="btn btn-secondary">Ghi</button>
                        <div class="p-2 mb-2 bg-info text-white">Lô tô đã ghi ngày: 02/10/2023</div>
                    </div>

                    <div className="text-left">
                        <p><a href="#" class="text-primary">*Cách tính điểm</a></p>
                        <div class="p-2 mb-2 bg-primary text-white">Thống kê lịch sử</div>

                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Lô</th>
                                    <th scope="col">Điểm</th>
                                    <th scope="col">Nháy</th>
                                    <th scope="col">Thắng/Thua</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">2023-09-28</th>
                                    <td>11</td>
                                    <td>1000</td>
                                    <td>0</td>
                                    <td class="text-danger">-23000</td>

                                </tr>
                                <tr className="table-secondary">
                                    <th scope="row">Tài khoản: -34000 </th>   {/*can merge lai */}
                                    <td>*</td>
                                    <th>1000</th>
                                    <td></td>
                                    <td class="text-danger">-23000</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Lô</th>
                                    <th scope="col">Điểm</th>
                                    <th scope="col">Nháy</th>
                                    <th scope="col">Thắng/Thua</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">2023-09-26</th>
                                    <td>20</td>
                                    <td>10</td>
                                    <td>0</td>
                                    <td class="text-danger">-230</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>21</td>
                                    <td>10</td>
                                    <td>1</td>
                                    <td class="text-success">570</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>22</td>
                                    <td>10</td>
                                    <td>1</td>
                                    <td class="text-success">570</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>23</td>
                                    <td>10</td>
                                    <td>0</td>
                                    <td class="text-danger">-230</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>25</td>
                                    <td>10</td>
                                    <td>0</td>
                                    <td class="text-danger">-230</td>
                                </tr>
                                <tr className="table-secondary">
                                    <th scope="row" >Tài khoản: 215</th>  {/*can merge lai */}
                                    <td>*</td>
                                    <th>50</th>
                                    <td></td>
                                    <td class="text-success">450</td>
                                </tr>
                            </tbody>
                        </table>

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