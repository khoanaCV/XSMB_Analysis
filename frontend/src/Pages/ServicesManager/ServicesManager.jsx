import React from "react";
import "./ServicesManager.css";
import { Col, Container, Row } from 'react-bootstrap';

const ServicesManager = () => {
    return (
        <>
  <Container className="mt-5 mb-4">
    <Row>
        <h1 className="display-1 mb-5 text-primary text-uppercase">List Services</h1>
    </Row>
    <Row>
        <Col>
        <table className="table bg-white border">
  <thead className="bg-light">
    <tr>
      <th>User Name</th>
      <th>Services Name</th>
      <th>Status</th>
      <th>Position</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Part Time</p>
        <p className="text-muted mb-0">BabySitt</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Full Time</p>
        <p className="text-muted mb-0">Baby Sitt</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Services 1</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Services 2</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Services 3</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt=""  className="imgc rounded-circle ml-5" />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Services 4</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-success rounded-pill d-inline text-success">Active</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" className="imgc rounded-circle ml-5" alt="" />
          <div className="ms-3">
            <p className="fw-bold mb-1">Alex Ray</p>
            <p className="text-muted mb-0">alex.ray@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">OnWait</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-primary rounded-pill d-inline text-warning">Onboarding</span>
      </td>
      <td>Junior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" className="imgc rounded-circle ml-5" alt=""  />
          <div className="ms-3">
            <p className="fw-bold mb-1">Kate Hunington</p>
            <p className="text-muted mb-0">kate.hunington@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">Join Class</p>
        <p className="text-muted mb-0">HD1</p>
      </td>
      <td>
        <span className="badge badge-warning rounded-pill d-inline text-danger">Awaiting</span>
      </td>
      <td>Senior</td>
      <td>
      <button type="button" className="btn btn-primary btn-sm btn-rounded">Approved</button>
        <button type="button" className="btn btn-primary btn-sm btn-rounded">Reject</button>
      </td>
    </tr>
  </tbody>
</table>
        </Col>
    </Row>
  </Container>
        </>
    );
}

export default ServicesManager;
