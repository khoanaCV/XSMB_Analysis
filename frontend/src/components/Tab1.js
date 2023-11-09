import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Tab1 = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'role', direction: 'ascending' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL_SERVER + `/users`);
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Data is not in the expected format', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const sortUsers = (key) => {
    setSortConfig({ key, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    sortableUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableUsers;
  }, [users, sortConfig]);

  const toggleUserStatus = async (userId) => {
    try {
      const user = users.find((u) => u._id === userId);
      const updatedStatus = !user.isActive;

      const response = await axios.put(process.env.REACT_APP_URL_SERVER + `/users/${userId}`, {
        isActive: updatedStatus,
      });

      if (response.status === 200) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, isActive: updatedStatus } : u)));
      } else {
        console.error('Failed to update user status', response.data);
      }
    } catch (error) {
      console.error('Error updating user status', error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to sort
    </Tooltip>
  );

  return (
    <div>
      <h2>User Management</h2>
      <Table striped bordered hover size="sm" className="shadow-sm my-4">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th style={{ cursor: 'pointer' }}>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip}
              >
                <span onClick={() => sortUsers('role')}>
                  Role {sortConfig.key === 'role' ? (sortConfig.direction === 'ascending' ? '⬆️' : '⬇️') : ''}
                </span>
              </OverlayTrigger>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user._id}>
              <td style={{ textAlign: 'left', paddingLeft: '20px' }}>{user.name}</td>
              <td style={{ textAlign: 'left', paddingLeft: '20px' }}>{user.email}</td>
              <td>
                <Badge
                  bg={user.isActive ? 'success' : 'secondary'}
                  onClick={() => toggleUserStatus(user._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.isActive ? 'Active' : 'Deactive'}
                </Badge>
              </td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tab1;
