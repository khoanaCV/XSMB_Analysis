import React from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const UserProfile = () => {
    return (
        <div className="container snippet">
            <ToastContainer />
            <div className="row">
                <div className="col-md-10">
                    <h1 >User Detail</h1>

                </div>
                <div className='col-md-3 bg-light h-fit-content'>
                    <div class="list-group">
                        <a href="/user/profile:id" class="list-group-item list-group-item-action active">Thông tin cá nhân</a>
                        <a href="/changepasword" class="list-group-item list-group-item-action">Thay đổi password</a>
                    </div>
                   
                </div>
            </div>


        </div>
    );
}



export default UserProfile;