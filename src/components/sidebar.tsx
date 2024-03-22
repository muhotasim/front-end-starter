import React, { useState } from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { RootState } from "../store";
export interface MenuItem {
    label: string
    link: string
    childrens: MenuItem[],
    permissionKey?: string;
}
const Sidebar: React.FC<{ menus: MenuItem[] }> = ({ menus = [] }) => {
    return <nav className="sidebar">
        <ul >
            {menus.map((menu, index) => {
                return <SideBarItem permissionKey={menu.permissionKey} key={index} label={menu.label} link={menu.link} childrens={menu.childrens} />
            })}
        </ul>
    </nav>
}

const SideBarItem: React.FC<MenuItem> = ({ label, link, childrens, permissionKey }) => {
    const [subMenu, setSubmenu] = useState(true);
    const toggleSubMenu = () => setSubmenu(!subMenu);
    const user = useSelector((state:RootState)=>state.auth.user);
    const { permissions, isSuperadmin } = user;
    const onClickMenuExpend = (e:React.MouseEvent<HTMLSpanElement>)=>{
        e.preventDefault();
        toggleSubMenu()
    }
    const isPermited = isSuperadmin || (permissions && permissions.find((permission)=>permission.permission_key==permissionKey))
    if( isPermited ){
        return <li>
        <NavLink to={link}><span className="label">{label}</span> {childrens.length > 0 && <span className={"submenu__expend "+(subMenu?'open': '')} onClick={onClickMenuExpend}><span className=' fa fa-chevron-down' /></span>}</NavLink>
        {childrens.length ? <ul className={'submenu '+(subMenu?'show': '')}>
            {childrens.map((menu, index) => {
                return <SideBarItem key={index} permissionKey={menu.permissionKey} label={menu.label} link={menu.link} childrens={menu.childrens} />
            })}
        </ul> : null}
    </li>
    }else{
        return null;
    }
    
}

export default Sidebar;