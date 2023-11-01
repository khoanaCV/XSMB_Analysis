import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios'
const Doctor = () => {
    const [countSparseArray, setCountSparseArray] = useState()

    useEffect(() => {
        axios.get('http://localhost:9999/sparses/last_appearing_loto')
            .then(res => setCountSparseArray(res.data?.data))
            .catch(err => console.log(err))
    }, []);
    console.log(countSparseArray);
    return (
        <section className="doctor-wrapper">
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="section-title">
                            <h1 className="mb-5 mb-sm-dent">Lô Tô Lâu Chưa Ra</h1>
                        </div>
                    </Col>
                </Row>
                <table className="tbl1" cellSpacing="1" cellPadding="4" style={{ border: "1px solid black" }}>
                    <tbody>
                        {countSparseArray?.map(item => {
                            if (item.count > 1) {
                                return <tr key={item.id}>
                                    <td style={{ border: "1px solid black" }} className="col1">{item.id}</td>
                                    <td style={{ border: "1px solid black" }} className="col2">{item.count}&nbsp;ngày</td>
                                </tr>
                            }
                            return <></>
                        })}
                    </tbody>
                </table>
            </Container>
        </section>
    );
};

export default Doctor;