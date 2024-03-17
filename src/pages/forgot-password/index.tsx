import React, { useState } from 'react';
import { Link } from 'react-router-dom';
type ForgotPasswordInput = {
    email?: string;
};
const ForgotPasswordPage:React.FC = ()=>{
    const [loginData, setLoginData] = useState<ForgotPasswordInput>({email: ''})
    const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }
    return <div className='page login-page'>
        <div className='login__container'>
            <h4 className='mb-15 section-title'> <Link to={'/login'} className='mr-5'><span className='fa-icon fa fa-arrow-left' ></span></Link> Forgot Password</h4>
            <div className='login-form px-15 animate-fade-in'>
                <div className='input-box mb-15'>
                    <label className='form-label'>Email</label>
                    <input type="text" name='email' value={loginData.email} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <button className='btn btn-md btn-primary btn-block'>Continue <span className='ml-5'><span className='fa-icon fa fa-arrow-right'  ></span></span></button>
                </div>
            </div>
        </div>
    </div>
}

export default ForgotPasswordPage;