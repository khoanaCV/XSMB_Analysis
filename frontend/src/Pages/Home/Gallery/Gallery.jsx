import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios'

import './Gallery.css';


const Gallery = () => {

    const [countMonthlySparseArray, setCountMonthlySparseArray] = useState()
    useEffect(() => {
        axios.get('http://localhost:9999/sparses/multi_appearing_loto')
            .then(res => setCountMonthlySparseArray(res.data?.data))
            .catch(err => console.log(err))
    }, []);
    return (
        <section className="gallery-wrapper text-white">
            <Container>
                <Row>
                    <Col sm={12} className="text-center">
                        <div className="section-title">
                            <h1>Lô Tô Ra Nhiều Trong Tháng</h1>
                        </div>
                    </Col>
                </Row>
                <table className="tbl1" cellSpacing="1" cellPadding="4" style={{ border: "1px solid black" }}>
                    <tbody>
                        {countMonthlySparseArray?.map(item => {
                            // if (item.count > 5) 
                            {
                                return <tr key={item.id}>
                                    <td style={{ border: "1px solid black" }} className="col1">{item.id}</td>
                                    <td style={{ border: "1px solid black" }} className="col2">{item.count}&nbsp;lần</td>
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

export default Gallery;