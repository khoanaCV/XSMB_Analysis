import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../Images/logo2.jpg";
import "./Header.css";

import AuthService from "../../../services/auth";
import userService from "../../../services/user";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user?.role === "manager",
        showAdminBoard: user?.roles === "admin",
        showUserBoard: user?.roles === "user",
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showUserBoard } =
      this.state;

    return (
      <div className="head-bg">
        <Navbar className="navbar" collapseOnSelect expand="lg">
          <Container className="container-head">
            <Navbar.Brand href="/home">
              <img src={logo} alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" expand="lg" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center">
                <Link to="/home" className="list-item text-decoration-none">
                  Trang Chủ
                </Link>
                <Link
                  to="/general/gan"
                  className="list-item text-decoration-none"
                >
                  Gan
                </Link>
                <Link
                  to="/top-play-number"
                  className="list-item text-decoration-none"
                >
                  Lô Top
                </Link>
                <Link
                  to="/playnumber"
                  className="list-item text-decoration-none"
                >
                  Ghi Lô
                </Link>
                <Link to="/forecast" className="list-item text-decoration-none">
                  Dự Đoán
                </Link>
                <Link
                  to="/integrated-statistics"
                  className="list-item text-decoration-none"
                >
                  Thống Kê Tổng Hợp
                </Link>
                <Link to="/mod" className="list-item text-decoration-none">
                  Quản lý người dùng
                </Link>
                {showModeratorBoard && (
                  <Link to={"/mod"} className="list-item text-decoration-none">
                    Manager Board
                  </Link>
                )}
                {showAdminBoard && (
                  <Link
                    to={"/userList"}
                    className="list-item text-decoration-none"
                  >
                    Admin Board
                  </Link>
                )}

                {showUserBoard && (
                  <Link
                    to={"/parent"}
                    className="list-item text-decoration-none"
                  >
                    Parent Board
                  </Link>
                )}
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link
                        to={"/user/profile:id"}
                        className="list-item text-decoration-none"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/login"
                        className="list-item text-decoration-none"
                        onClick={this.logOut}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <Link to="/login" type="button" className="btn btn-danger">
                    Login
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
// <Navbar.Text><a href="/UserDetails"><FontAwesomeIcon icon={faUser} /><span className="userName"></span></a></Navbar.Text>
export default Header;
