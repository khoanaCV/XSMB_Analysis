import React from 'react';
import { Col, Container, Row, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Result = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col md={12} lg={12} sm={12} className="text-center mb-5">
                    <div className="section-title mt-5">
                        <h1>Top Số Được Nhiều Người Chơi</h1>
                    </div>
                    <div>
                        Xem lô top: <a href="#" class="text-decoration-none">Hôm qua</a>&nbsp;&nbsp;
                        <a href="#" class="text-decoration-none">Hôm nay</a>&nbsp;&nbsp;
                        Chọn ngày<input className="border-[1px] border-black ml-1 mr-4 rounded-sm" type="date" name="startDate" size="15"/>

                    </div>
                </Col>
                <Col>

                    <div class="p-1 mb-1 bg-info text-white">
                        Bảng số Top ngày: 01/10/2023
                        <table className="table">
                            <tbody>
                                <tr class="table-light">
                                    <th scope="row">65</th>
                                    <td>12<span class="badge text-black">2</span></td>
                                    <td>16</td>
                                    <td>84<span class="badge text-black">4</span></td>
                                    <td>34</td>
                                    <td>22</td>
                                    <td>49<span class="badge text-black">3</span></td>
                                    <td>64<span class="badge text-black">1</span></td>
                                    <td>25</td>
                                    <td>87</td>
                                    <td>73</td>
                                    <td>43<span class="badge text-black">1</span></td>
                                    <td>45</td>
                                    <td>67</td>
                                    <td>87</td>
                                </tr>
                                <a href="#" class="badge badge-primary">Xem thêm</a>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <h5>Lịch sử số top</h5>
                    <br></br>
                    <div class="p-1 mb-1 bg-info text-white">
                        Bảng số Top ngày: 02/10/2023
                        <table className="table">
                            <tbody>
                                <tr class="table-light">
                                    <th scope="row">32</th>
                                    <td>12<span class="badge text-black">2</span></td>
                                    <td>61</td>
                                    <td>32<span class="badge text-black">1</span></td>
                                    <td>87</td>
                                    <td>21</td>
                                    <td>19<span class="badge text-black">2</span></td>
                                    <td>91<span class="badge text-black">1</span></td>
                                    <td>52</td>
                                    <td>78</td>
                                    <td>11</td>
                                    <td>37<span class="badge text-black">1</span></td>
                                    <td>15</td>
                                    <td>41</td>
                                    <td>72</td>
                                </tr>
                                <a href="#" class="badge badge-primary">Xem thêm</a>
                            </tbody>
                        </table>
                    </div>




                </Col>
            </Row>
        </Container>
    );
};

export default Result;