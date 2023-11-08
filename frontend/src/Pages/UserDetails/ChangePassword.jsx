import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const ChangePassword = () => {

    return (
        <div className='component component-profile bg-F4F4F4'>
            <div className='container'>
                <div className='row gap-3'>
                    <div className='col-md-3 bg-light h-fit-content'>
                        <div className='sidebar'>
                            <div className='sidebar-title'>Thông tin cá nhân</div>
                            <div className='sidebar-option'>
                                <Link to='/user/profile:id' className='uncheck' >Thông tin cá nhân</Link>
                                <Link to='/changepasword'  className='check'>Thay đổi password</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col bg-light'>
                        <div className='profile-detail'>

                            <div className='profile-form'>
                                <form method='POST' action=''>
                                    <div className='profile-title mb-4'>
                                        Thay đổi mật khẩu
                                    </div>
                                    
                                    <div className='form-info'>
                                        <div className='form-group row align-items-center mb-4'>
                                            <div className=''><input type='text' placeholder='Mật khẩu hiện tại' name='oldPassword' id='oldPassword' className='form-control'></input></div>
                                        </div>
                                        <div className='form-group row align-items-center mb-4'>
                                            <div className=''><input type='text' placeholder='Mật khẩu mới' name='newPassword' id='newPassword' className='form-control'></input></div>
                                        </div>
                                        <div className='form-group row align-items-center mb-4'>
                                            <div className=''><input type='text' placeholder='Xác nhận mật khẩu mới' name='rePassword' id='rePassword' className='form-control'></input></div>
                                        </div>
                                        

                                    </div>
                                    <div className='text-center'>
                                        <button type='submit' className='text-center btn btn-bg-primary text-white'>Lưu thay đổi</button>
                                    </div>
                                </form>


                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ChangePassword
