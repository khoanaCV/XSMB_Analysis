import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import userService from '../services/user.service';
import './Child.css'

const Child = ({ id, firstName, lastName, dob, status, gender, interest, needs, note, medications }) => {
    const [classInfo, setClassInfo] = useState({});

    const age = calculateAge(dob);
    useEffect(() => {
        async function fetchData() {
            const response = await userService.getClassFromChild(id);
            console.log(response.data)
            setClassInfo(response.data);
        }
        fetchData();
    }, []);

    return (
        <Container className='Child pb-5'>
            <Row className='text-center p-5'>
                <h1>Children Details</h1>
            </Row>
            <Row>
                <Col md={6} lg={6} sm={6} className='ps-5 border-end'>
                    <Row className='text-center'>
                        <h3>Child: {firstName} {lastName}</h3>
                    </Row>
                    <Row >
                        <h3>Age: {age}</h3>
                    </Row>
                    <Row >
                        <h3>Needs: {needs}</h3>
                    </Row>
                    <Row >
                        <h3>Notes: {note}</h3>
                    </Row>
                    <Row >
                        <h3>Interest: {interest}</h3>
                    </Row>
                </Col>
                {classInfo ?
                    <Col md={6} lg={6} sm={6} className='ps-5'>
                        <Row className='text-center'>
                            <h3>Class: {classInfo.name}</h3>
                        </Row>
                        <Row >
                            <h3>Service: {classInfo.service}</h3>
                        </Row>
                        <Row >
                            <h3>Age-range: {classInfo.ageRange}</h3>
                        </Row>
                        <Row >
                            <h3>Description: {classInfo.description}</h3>
                        </Row>
                        <Row>
                            <h3>Start Date: {classInfo.startDate}</h3>
                        </Row>
                    </Col>
                    :
                    <Col md={6} lg={6} sm={6} className='ps-5'>
                        <Row className='text-center'>
                            <h4>Class: Unassigned</h4>
                        </Row>
                    </Col>}
            </Row>
            <Row className='text-center mt-4'>
                <Col md={12} lg={12} sm={12} >
                    <Link to={`/editchild/${id}`} className="link-button">
                        Edit child
                    </Link>
                </Col>
            </Row>
        </Container>

        // <div className="border rounded-lg p-4">
        //     <div className="flex items-center justify-between">
        //         <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
        //     </div>
        //     <p className="text-gray-600">{dob} (Age: {age})</p>
        //     <p>Status: {status}</p>
        //     <h3 className="text-lg font-bold mt-4">Interest</h3>
        //     <p>{interest}</p>
        //     <h3 className="text-lg font-bold mt-4">Needs </h3>
        //     <p>{needs}</p>

        // </div>
    );
};

const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age--;
    }
    return age;
}

export default Child;
