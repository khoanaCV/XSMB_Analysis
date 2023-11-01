import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Table from 'react-bootstrap/Table';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <Table responsive style={{ fontSize: 35 }}>
                {(this.state.userReady) ?
                    <div className="container mt-5 mb-5">
                        <tr>
                            <td><strong>{currentUser.username}</strong> Profile <img src="https://picsum.photos/200" width="200" height="200" className="img-fluid" alt="userp" /></td>
                        </tr>
                        <tr>
                            <td>Token:</td>{" "}
                            <td>
                                {currentUser.accessToken.substring(0, 20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </td>
                        </tr>
                        <tr>
                            <td>Id:</td>{" "}
                            <td> {currentUser.id}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>{" "}
                            <td> {currentUser.email}</td>
                        </tr>
                        <tr>
                            <td>Authorities:</td>
                            <td>
                                {currentUser.roles &&
                                    currentUser.roles.map((role, index) => <p key={index}>{role}</p>)}
                            </td>
                        </tr>
                    </div> : null}
            </Table>
        );
    }
}