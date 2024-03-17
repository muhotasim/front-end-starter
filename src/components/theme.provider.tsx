
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from '../store';
const ThemeProvider:React.FC<{children:React.ReactElement}> = ({ children })=>{
    const ui = useSelector((state:RootState)=>state.ui)
    const theme = ui.theme;
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return <div className={theme}>
        {children}
        {isOnline ? (
            <p className="network-connection">You are connected to the internet.</p>
        ) : (
            <p className="network-connection">You are not connected to the internet.</p>
        )}
    </div>;
}

export default ThemeProvider;