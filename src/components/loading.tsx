import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Loader:React.FC = ()=>{
    return <div className="component-loader">
        <p><FontAwesomeIcon spin={true} icon={faSync}/> Please Wait...</p>
    </div>
}

export default Loader;