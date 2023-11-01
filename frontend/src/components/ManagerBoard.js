import { useState } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import 'bootstrap/dist/css/bootstrap.min.css';
const ManageBoard = () => {

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [<Tab1 />, <Tab2 />, <Tab3 />];

    return (
        <div className="container-fluid mt-5 mb-5">
            <ul className="nav nav-tabs w-100">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => setActiveTab(0)}
                    >
                        User List
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Donate
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => setActiveTab(2)}
                    >
                        Donate List
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                        onClick={() => setActiveTab(3)}
                    >
                        
                    </a>
                </li>
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
