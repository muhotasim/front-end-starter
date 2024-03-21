import React, { useState } from "react"
import { NavLink } from "react-router-dom"
interface MenuItem {
    label: string
    link: string
    childrens: MenuItem[]
}
const Sidebar: React.FC<{ menus: MenuItem[] }> = ({ menus = [] }) => {
    return <nav className="sidebar">
        <ul >
            {menus.map((menu, index) => {
                return <SideBarItem key={index} label={menu.label} link={menu.link} childrens={menu.childrens} />
            })}
        </ul>
    </nav>
}

const SideBarItem: React.FC<MenuItem> = ({ label, link, childrens }) => {
    const [subMenu, setSubmenu] = useState(true);
    const toggleSubMenu = () => setSubmenu(!subMenu);

    const onClickMenuExpend = (e:React.MouseEvent<HTMLSpanElement>)=>{
        e.preventDefault();
        toggleSubMenu()
    }
    return <li>
        <NavLink to={link}><span className="label">{label}</span> {childrens.length > 0 && <span className={"submenu__expend "+(subMenu?'open': '')} onClick={onClickMenuExpend}><span className=' fa fa-chevron-down' /></span>}</NavLink>
        {childrens.length ? <ul className={'submenu '+(subMenu?'show': '')}>
            {childrens.map((menu, index) => {
                return <SideBarItem key={index} label={menu.label} link={menu.link} childrens={menu.childrens} />
            })}
        </ul> : null}
    </li>
}

export default Sidebar;