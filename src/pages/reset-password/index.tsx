import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { userActions } from '../../store/user-store.store';
import { Link, useNavigate, useParams } from 'react-router-dom';
type ResetPasswordInput = {
    password: string;
    confirm_password:string;
};
const ResetPasswordPage:React.FC = ()=>{
    const dispatch = useDispatch()
    const {token} = useParams()
    const navicate = useNavigate()
    const {isLoading, passwordResetSuccess} = useSelector(((state:RootState)=>state.users))
    const [loginData, setLoginData] = useState<ResetPasswordInput>({password: '', confirm_password: ''})
    const onChangeFormData = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }
    useEffect(()=>{
        dispatch(userActions.updateState({passwordResetSuccess: false}))
    },[])
    return <div className='page login-page'>
        <div className='login__container'>
            <h4 className='mb-15 section-title'>Reset Password</h4>
            {passwordResetSuccess?<div className='login-form px-15 animate-fade-in'>
                <p className='action-success'>Your password has been reset successfully</p>
                <button className='btn btn-md btn-primary btn-block' onClick={()=>{navicate('/login')}}>Back To Login</button>
            </div>:<div className='login-form px-15 animate-fade-in'>
                <div className='input-box mb-15'>
                    <label className='form-label'>Password</label>
                    <input type="text" name='password' value={loginData.password} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <label className='form-label'>Confirm Password</label>
                    <input type="text" name='confirm_password' value={loginData.confirm_password} onChange={onChangeFormData} className='input'/>
                </div>
                <div className='input-box mb-15'>
                    <button className='btn btn-md btn-primary btn-block' disabled={!loginData.confirm_password||!loginData.password || loginData.confirm_password!=loginData.password || isLoading} onClick={()=>{if(token){
                        userActions.resetPassword(token, loginData.password)(dispatch)
                    }}}>Reset Password <span className='ml-5'><span className={`fa-icon fa ${isLoading?'fa-spin fa-sync':'fa-arrow-right'}`} color='#fff'></span></span></button>
                </div>
            </div>}
        </div>
    </div>
}

export default ResetPasswordPage;