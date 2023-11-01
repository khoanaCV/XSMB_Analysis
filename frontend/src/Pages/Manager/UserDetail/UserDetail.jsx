// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table } from "react-bootstrap";
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

// const UserTable() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("/api/users").then((response) => {
//       setUsers(response.data);
//     });
//   }, []);

//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Phone</th>
//           <th>Address</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.firstname}</td>
//             <td>{user.lastname}</td>
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             <td>{user.phone}</td>
//             <td>{user.address}</td>
//           </tr>
//         ))}
//       </tbody>
//       </Table>
//   );
// }

// export default UserTable;

const UserTable = () => {
    const users = [
      {
        id: 1,
        address: "123 Main St, Anytown, USA",
        email: "johndoe@gmail.com",
        firstName: "John",
        lastName: "Doe",
        password: "password123",
        phone: "555-123-4567",
        username: "johndoe",
      }
    ];
  
    return (
      <Container >
        <Row className="justify-content-center mt-5 mb-4">
          {users.map((user) => (
            <Col xs={12} md={10} lg={12} key={user.id} className="mb-4">
              <Card>
              
              <img className="card-img-top" src="https://picsum.photos/seed/picsum/690/270" alt="Card image cap" />
                <Card.Body>
                  <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                  <Card.Text>
                    <strong>Username: </strong> {user.username} <br />
                    <strong>Email: </strong> {user.email} <br />
                    <strong>Phone: </strong> {user.phone} <br />
                    <strong>Address: </strong> {user.address}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  export default UserTable;