import { faBars, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const TopBar:React.FC<{toggle:()=>void}> = ({ toggle })=>{
    return <>
        <nav className="top-bar">
            <Link className="topbar-brand" to='/'>Speedy </Link>
            <a  className="topbar-toggle" onClick={(e)=>{
                e.preventDefault();
                toggle()
            }}><span> <span><FontAwesomeIcon icon={faBars}/></span> </span></a>
            <ul>
                <li><a><span><FontAwesomeIcon icon={faBell}/></span></a></li>
                <li>
                    <a><span className="pr-5"><FontAwesomeIcon icon={faUser}/></span> User</a>
                </li>
            </ul>
        </nav>
    </>
}

export default TopBar;