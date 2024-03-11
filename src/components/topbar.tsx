import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { setTheme } from "../store/ui-store.store";

const TopBar:React.FC<{toggle:()=>void}> = ({ toggle })=>{
    const dispatch = useDispatch();
    const ui = useSelector((state:RootState)=>state.ui);
    const changeTheme = (e)=>{
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
                <li><a><span><span className='fa-icon fa fa-bell'> </span></span></a></li>
                <li>
                    <a><span className="pr-5"><span className='fa-icon fa fa-user'/></span> User</a>
                </li>
            </ul>
        </nav>
    </>
}

export default TopBar;