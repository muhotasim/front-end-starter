import React, { useState } from 'react';
type ResetPasswordInput = {
    password?: string;
    confirm_password?:string;
};
const ResetPasswordPage:React.FC = ()=>{
    const [loginData, setLoginData] = useState<ResetPasswordInput>({password: '', confirm_password: ''})
    const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }
    return <div className='page login-page'>
        <div className='login__container'>
            <h4 className='mb-15 section-title'>Reset Password</h4>
            <div className='login-form px-15 animate-fade-in'>
                <div className='input-box mb-15'>
                    <label className='form-label'>Password</label>
                    <input type="text" name='password' value={loginData.password} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <label className='form-label'>Confirm Password</label>
                    <input type="text" name='confirm_password' value={loginData.confirm_password} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <button className='btn btn-md btn-primary btn-block'>Reset Password <span className='ml-5'><span className='fa-icon fa fa-arrow-right' color='#fff'></span></span></button>
                </div>
            </div>
        </div>
    </div>
}

export default ResetPasswordPage;