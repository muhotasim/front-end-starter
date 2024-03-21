import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserApiService } from "../../services/user-api.service";
import appConst from "../../constants/app.const";
import { ResponseType } from "../../utils/contome.datatype";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../../store/users.store";
import { RootState } from "../../store";

const ModifyUser = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state:RootState)=>state.user)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        is_active: true
    });
    const onFormField = (key:string, value:any)=>{
        setFormData({...formData, [key]: value})
    }

    const fetchData = async ()=>{
        if(id){
            const userService = new UserApiService(appConst.API_URL);
            const userResponse =await userService.getById(id);
            const userResult = await userResponse.json();
            if(userResult.type == ResponseType.success){
                setFormData({
                    name: userResult.data.name,
                    email: userResult.data.email,
                    password: userResult.data.password,
                    is_active: userResult.data.is_active,
                })
            }
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(id){
            let result = await usersActions.update(id, formData)(dispatch);
            if(result && result.type == ResponseType.success){
                navigate('/users')
            }
        }else{
            let result = await usersActions.create(formData)(dispatch);
            if(result && result.type == ResponseType.success){
                navigate('/users')
            }
        }
    }

    useEffect(()=>{
        fetchData();
    }, [])
    return <div className='page dashboard-page animate-fade-in'>
    <h2 className="mt-15 mb-15"> {id?'Update':'Create'} User</h2>
    <form onSubmit={onSubmit}>
        {error&&<p className="error-message">{error}</p>}
        <div className="form-group mt-15">
            <label className="form-label">Name</label>
            <input className="input" value={formData.name} onChange={e=>onFormField('name', e.target.value)}/>
        </div>
        <div className="form-group mt-15">
            <label className="form-label">Email</label>
            <input className="input" value={formData.email} onChange={e=>onFormField('email', e.target.value)}/>
        </div>
        <div className="form-group mt-15">
            <label className="form-label">Password</label>
            <input className="input" value={formData.password} onChange={e=>onFormField('password', e.target.value)}/>
        </div>
        <div className="form-group mt-15">
            <label className="form-label"> <input type="checkbox" checked={formData.is_active} onClick={e=>onFormField('is_active',!formData.is_active)}/> Is Active</label>
            
        </div>
        <button disabled={isLoading} className="btn btn-md btn-primary float-right"> <i className={`fa ${isLoading?'fa-sync fa-spin':'fa-save'}`}></i> {id?"Update":"Save"}</button>
    </form>
    </div>
}

export default ModifyUser;