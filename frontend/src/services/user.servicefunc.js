import axios from 'axios';
import authHeader from './auth-header';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/';

function UserService() {
    const [publicContent, setPublicContent] = useState(null);
    const [userBoard, setUserBoard] = useState(null);
    const [moderatorBoard, setModeratorBoard] = useState(null);
    const [adminBoard, setAdminBoard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const publicContentResponse = await axios.get(API_URL + 'all');
                setPublicContent(publicContentResponse.data);

                const userBoardResponse = await axios.get(API_URL + 'user', { headers: authHeader() });
                setUserBoard(userBoardResponse.data);

                const moderatorBoardResponse = await axios.get(API_URL + 'mod/children', { headers: authHeader() });
                setModeratorBoard(moderatorBoardResponse.data);

                const adminBoardResponse = await axios.get(API_URL + 'admin', { headers: authHeader() });
                setAdminBoard(adminBoardResponse.data);
            } catch (error) {
                setError(
                    error.response?.data?.message || error.message || 'An error occurred while fetching data.'
                );
            }
        }

        fetchData();
    }, []);

    return {
        publicContent,
        userBoard,
        moderatorBoard,
        adminBoard,
        error,
    };
}

export default UserService;