import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { setTheme } from "../store/ui-store.store";
import React, { ChangeEvent, useState } from "react";
import { logout } from "../store/user-store.store";

const TopBar:React.FC<{toggle:()=>void}> = ({ toggle })=>{
    const dispatch = useDispatch();
    const [openNotification, setOpenNotification] = useState(false);
    const [openUserDetails, setOpenUserDetails] = useState(false);

    const toggleNotification = ()=>setOpenNotification(!openNotification);
    const toggleUserDetails= ()=>setOpenUserDetails(!openUserDetails);
    const ui = useSelector((state:RootState)=>state.ui);
    const changeTheme = (e:ChangeEvent<HTMLSelectElement>)=>{
        dispatch(setTheme({theme: e.target.value}))
    }
    return <>
        <nav className="top-bar">
            <Link className="topbar-brand" to='/'>Speedy </Link>
            <a  className="topbar-toggle" onClick={(e)=>{
                e.preventDefault();
                toggle()
            }}> <span><span className='fa-icon fa fa-bars' ></span> </span></a>
            <ul>
                <li><select className="theme-selector" onChange={changeTheme} value={ui.theme}>
                    {ui.themeList.map((value, index)=><option key={index} value={value}>{value}</option>)}
                    </select></li>
                <li>
                    <a onClick={toggleNotification}><span><span className='fa-icon fa fa-bell'> </span></span></a>
                    <div className={"menu-details "+(openNotification?'open-menu': '')}>
                        <ul>
                            <li><a href="">Notification 1</a></li>
                            <li><a href="">Notification 2</a></li>
                            <li><a href="">Notification 3</a></li>
                            <li className="see-all-menu"><a href="">See All</a></li>
                        </ul>
                    </div>    
                </li>
                
                <li>
                    <a onClick={toggleUserDetails}><span className="pr-5"><span className='fa-icon fa fa-user'/></span> User</a>
                    <div className={"menu-details "+(openUserDetails?'open-menu': '')}>
                        <div className="user__details">
                            <img className="img"/>
                            <div className="actions">
                                <button className="btn btn-md btn-primary">Change Password</button><button onClick={()=>{dispatch(logout())}} className="btn btn-md btn-primary">Logout</button>
                            </div>
                        </div>
                    </div>  
                </li>
            </ul>
        </nav>
    </>
}

export default TopBar;