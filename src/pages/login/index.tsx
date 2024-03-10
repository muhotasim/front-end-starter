import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRight, faSignIn, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
type LoginInput = {
    email?: string;
    password?: string;
};
const LoginPage:React.FC = ()=>{
    const [loginData, setLoginData] = useState<LoginInput>({email: '', password: ''})
    const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }
    const onFinish= ()=>{
    }
    return <div className='page login-page'>
        <div className='login__container'>
            <h4 className='mb-15 section-title'><span className='mr-5'><FontAwesomeIcon icon={faSignInAlt}/></span> Login</h4>
            <div className='login-form px-15 animate-fade-in'>
                <div className='input-box mb-15'>
                    <label className='form-label'>Email</label>
                    <input type="text" name='email' value={loginData.email} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <label className='form-label'>Password</label>
                    <input type="text" name='password' value={loginData.password} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <button className='btn btn-md btn-primary btn-block'>Login <span className='ml-5'><FontAwesomeIcon icon={faArrowRight} color='#fff'/></span></button>
                    <p className='mt-5'>Forgot password click <Link to='/forgot-password' className='text-link'>here</Link></p>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;