import React from 'react';

const ChildListItem = ({ child }) => {
    const { firstName, lastName, dob, status } = child;

    return (
        <tr className={status === 'active' ? 'bg-green-200' : 'bg-red-200'}>
            <td className="border px-4 py-2">{firstName}</td>
            <td className="border px-4 py-2">{lastName}</td>
            <td className="border px-4 py-2">{dob}</td>
            <td className="border px-4 py-2">{status}</td>
            <td className="border px-4 py-2">
                <div className="flex">
                    <input type="checkbox" className="mr-2" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign</button>
                </div>
            </td>
        </tr>
    );
};

export default ChildListItem;
