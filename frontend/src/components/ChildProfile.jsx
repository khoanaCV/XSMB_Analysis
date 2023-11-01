import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userService from '../services/user.service';
import Child from './Child';

const ChildProfile = () => {

    const { id } = useParams();

    const [childInfo, setChildInfo] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getChildInfo(id);
            console.log(response.data)
            setChildInfo(response.data);
        }
        fetchData();
    }, []);

    if (!childInfo) {
        return <div>Loading...</div>;
    }

    const child = {
        firstName: 'John',
        lastName: 'Doe',
        dob: '01/01/2015',
        status: 'Active',
        address: '123 Main Street, Anytown USA',
        allergies: 'Peanuts, Cats',
        medications: 'None'
    };


    return (
        <div>
            <Child
                id={id}
                firstName={childInfo.firstName}
                lastName={childInfo.lastName}
                dob={childInfo.dob}
                status={childInfo.status}
                gender={childInfo.gender}
                interest={childInfo.interest}
                needs={childInfo.needs}
                note={childInfo.note}
            />

        </div>

    );
}

export default ChildProfile;
