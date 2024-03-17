import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/user-store.store';
import { RootState } from '../../store';
type ForgotPasswordInput = {
    email: string;
};
const ForgotPasswordPage:React.FC = ()=>{
    const dispatch = useDispatch()
    const {isLoading, forgotPasswordMailSend} = useSelector(((state:RootState)=>state.users))
    const [loginData, setLoginData] = useState<ForgotPasswordInput>({email: ''})
    const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }

    useEffect(()=>{
        
        dispatch(userActions.updateState({forgotPasswordMailSend: false}));
    },[])
    return <div className='page login-page'>
        <div className='login__container'>
            <h4 className='mb-15 section-title'> <Link to={'/login'} className='mr-5'><span className='fa-icon fa fa-arrow-left' ></span></Link> Forgot Password</h4>
            {forgotPasswordMailSend?<div className='login-form px-15 animate-fade-in'>
                <p  className='action-success'>Please check your email for reset password link</p>
            </div>:<div className='login-form px-15 animate-fade-in'>
                <div className='input-box mb-15'>
                    <label className='form-label'>Email</label>
                    <input type="text" name='email' value={loginData.email} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <button className='btn btn-md btn-primary btn-block' disabled={isLoading||!loginData.email} onClick={()=>{userActions.forgotPassword(loginData.email)(dispatch)}}>Continue <span className='ml-5'><span className={`fa-icon fa ${isLoading?'fa-spin fa-sync':'fa-arrow-right'}`}  ></span></span></button>
                </div>
            </div>}
        </div>
    </div>
}

export default ForgotPasswordPage;