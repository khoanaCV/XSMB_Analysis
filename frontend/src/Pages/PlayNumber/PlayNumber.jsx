import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import PlayService from "../../services/plays";
const PlayNumber = () => {
  const [formData, setFormData] = useState({
    date: "",
    number: "",
    point: "",
  });
  const [errors, setErrors] = useState({});
  const { date, number, point } = formData;
  const now = new Date();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    await PlayService.create(user._id, date, number, point).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const validateForm = () => {
      let errors = {};
      if (!date) {
        errors.date = "";
      } else if (new Date(date) < now) {
        errors.date = "Phải ghi ngày hôm sau";
      }
      if (!number) {
        errors.number = "";
      } else if (number.length > 2) {
        errors.number = "Lô chỉ có 2 số";
      }
      if (!point) {
        errors.point = "";
      }
      setErrors(errors);
    };
    validateForm();
  }, [formData]);

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={12} lg={12} sm={12}>
          <div className="text-center">
            <h1>Ghi Số</h1>
          </div>

          <p className="font-weight-bold">
            <a href="#" className="text-primary">
              Lưu ý:
            </a>
            Ghi lô ở đây không sử dụng tiền thật
            <a href="#" className="text-primary">
              [Tìm hiểu thêm]
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3} className="mb-4">
                <Form.Label htmlFor="date">Ngày ghi</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Date"
                  value={date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <Form.Text
                    id="passwordHelpBlock"
                    style={{ color: "red" }}
                    muted
                  >
                    {errors.date}
                  </Form.Text>
                )}
              </Col>
              <Col md={3} className="mb-4">
                <Form.Label htmlFor="date">Cặp số</Form.Label>
                <Form.Control
                  type="number"
                  name="number"
                  id="number"
                  placeholder="00"
                  value={number}
                  onChange={handleChange}
                />
                {errors.number && (
                  <Form.Text
                    id="passwordHelpBlock"
                    style={{ color: "red" }}
                    muted
                  >
                    {errors.number}
                  </Form.Text>
                )}
              </Col>
              <Col md={3} className="mb-4">
                <Form.Label htmlFor="date">Điểm</Form.Label>
                <Form.Control
                  type="number"
                  name="point"
                  id="point"
                  placeholder="0"
                  value={point}
                  onChange={handleChange}
                />
                {errors.point && (
                  <Form.Text id="passwordHelpBlock" muted>
                    {errors.point}
                  </Form.Text>
                )}
              </Col>

              <Col md={3} className="d-flex mb-4">
                <Button type="submit" variant="secondary">
                  Ghi Số
                </Button>
              </Col>
            </Row>
          </form>

          <div>
            <p className="text-success">Tài khoản hiện có: -34.000</p>
            <div className="p-2 mb-2 bg-info text-white">
              Lô tô đã ghi ngày: 02/10/2023
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Điểm</th>
                    <th scope="col">Nhận</th>
                    <th scope="col">Chi</th>
                    <th scope="col">Lãi/Lỗ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-light">
                    <th scope="row">5</th>
                    <td>115.000</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-left">
            <a href="#" className="text-primary">
              *Cách tính điểm
            </a>
            <div className="p-2 mb-2 bg-primary text-white">
              Thống kê lịch sử
            </div>

            <table className="table">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Ngày</th>
                  <th scope="col">Lô</th>
                  <th scope="col">Điểm</th>
                  <th scope="col">Nháy</th>
                  <th scope="col">Thắng/Thua</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">2023-09-28</th>
                  <td>11</td>
                  <td>1000</td>
                  <td>0</td>
                  <td className="text-danger">-23.000</td>
                </tr>
                <tr className="table-secondary">
                  <th scope="row">Tài khoản: -34.000 </th> {/*can merge lai */}
                  <td>*</td>
                  <th>1000</th>
                  <td></td>
                  <td className="text-danger">-230.000</td>
                </tr>
              </tbody>
            </table>

            <table className="table">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Ngày</th>
                  <th scope="col">Lô</th>
                  <th scope="col">Điểm</th>
                  <th scope="col">Nháy</th>
                  <th scope="col">Thắng/Thua</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">2023-09-26</th>
                  <td>20</td>
                  <td>10</td>
                  <td>0</td>
                  <td className="text-danger">-230.000</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>21</td>
                  <td>10</td>
                  <td>1</td>
                  <td className="text-success">570.000</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>22</td>
                  <td>10</td>
                  <td>1</td>
                  <td className="text-success">570.000</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>23</td>
                  <td>10</td>
                  <td>0</td>
                  <td className="text-danger">-230.000</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td>25</td>
                  <td>10</td>
                  <td>0</td>
                  <td className="text-danger">-230.000</td>
                </tr>
                <tr className="table-secondary">
                  <th scope="row">Tài khoản: 215.000</th> {/*can merge lai */}
                  <td>*</td>
                  <th>50</th>
                  <td></td>
                  <td className="text-success">450.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={12} lg={12} sm={12} className="text-center mb-5">
          <Link to="/">
            <button className="btn btn-warning">Go Back</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayNumber;
