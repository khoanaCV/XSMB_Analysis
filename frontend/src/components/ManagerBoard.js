import React, { useState, useEffect } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageBoard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy thông tin người dùng từ local storage và kiểm tra vai trò
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    // Định nghĩa các tabs dựa trên vai trò người dùng
    const tabs = user && user.role === 'admin' ? [<Tab1 />, <Tab2 />, <Tab3 />] : [<Tab2 />, <Tab3 />];

    return (
        <div className="container-fluid mt-5 mb-5">
            <ul className="nav nav-tabs w-100">
                {user && user.role === 'admin' && (
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                            onClick={() => setActiveTab(0)}
                        >
                            User List
                        </a>
                    </li>

                )}

            </ul>
            <div className="tab-content">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                    >
                        {tab}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageBoard;
