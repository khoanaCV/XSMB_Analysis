import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

const Tab1 = () => {

    const navigate = useNavigate();

    const [selectedChildren, setSelectedChildren] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await userService.getModeratorBoard();
            setData(response.data);
        }
        fetchData();
    }, []);

    const items = [
        { firstName: 'John', lastName: 'Doe', dob: '01/01/1990', status: 'Assigned' },
        { firstName: 'Jane', lastName: 'Doe', dob: '02/02/1995', status: 'UnAssigned' },
        { firstName: 'Bob', lastName: 'Smith', dob: '03/03/2000', status: 'Assigned' },
        { firstName: 'Alice', lastName: 'Johnson', dob: '04/04/1992', status: 'UnAssigned' },
    ];

    const sortedItems = items.sort((b, a) => a.status.localeCompare(b.status));

    const sportedData = data.sort((b, a) => String(a.status).localeCompare(String(b.status)));

    const handleCheckboxChange = (event, index) => {
        const isChecked = event.target.checked;
        const itemStatus = sportedData[index].status;
        if (itemStatus === 'Assigned') {
            if (isChecked) {
                setSelectedChildren([...selectedChildren, index]);
            } else {
                setSelectedChildren(selectedChildren.filter((i) => i !== index));
            }
        }
    };

    const handleAssignChildren = () => {
        console.log(`Assigned children: ${selectedChildren}`);
        setSelectedChildren([]);
    };

    return (
        <div>
            <h3>User List</h3>
            <ul className="list-group">
                {sportedData.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="form-check">

                            <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                                {item.firstName} {item.lastName} ({item.dob}) - {item.status}
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate("/child/" + item.id)}>
                            View Details
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};
export default Tab1;


// <div className="mt-3 mb-4">
//     <button className="btn btn-success" onClick={handleAssignChildren} disabled={!selectedChildren.length}>
//         Assign Children
//     </button>
// </div>

// <input
//     type="checkbox"
//     className="form-check-input"
//     id={`checkbox-${index}`}
//     checked={selectedChildren.includes(index)}
//     onChange={(event) => handleCheckboxChange(event, index)}
//     disabled={item.status !== 'UnAssigned'}
// />