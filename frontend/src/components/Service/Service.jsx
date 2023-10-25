import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';  // Import axios for making API requests

const Service = () => {
    const [countSpecialPrizes, setCountSpecialPrizes] = useState({}); // State to hold the special prize data

    useEffect(() => {
        // Make an API request to get the special prize data
        axios.get('http://localhost:9999/special/special-long-to-long') // Replace YOUR_PORT_HERE with the correct port
            .then((response) => {
                setCountSpecialPrizes(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching special prizes data: ', error);
            });
    }, []);

    return (
        <section className="gallery-wrapper text-white">
            <Container>
                <Row>
                    <Col sm={12} className="text-center">
                        <div className="section-title">
                            <h1>Số ngày mà các giải đặc biệt lâu chưa ra</h1>
                        </div>
                    </Col>
                </Row>
                <table className="tbl1" cellSpacing="1" cellPadding="4" style={{ border: "1px solid black" }}>
                    <tbody>
                        {Object.keys(countSpecialPrizes).map((specialPrize, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid black" }} className="col1">{specialPrize}</td>
                                <td style={{ border: "1px solid black" }} className="col2">{countSpecialPrizes[specialPrize]} ngày</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </section>
    );
};

export default Service;
