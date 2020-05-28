import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavContext } from '../contexts/NavContext';

const Navigation = props =>{

    const { isLoggedIn, setIsLoggedIn, isClient, setIsClient } = useContext(NavContext)

    const handleLogout = () =>{
        localStorage.clear()
        setIsLoggedIn(false)
        if(isClient){
            setIsClient(false)
        }
    }

    return(
        <div>
            <NavLink to="/">Home</NavLink>
            {!isLoggedIn && (
                <>
                    <NavLink to="/login" >Login</NavLink>
                </>
            )}
            {isLoggedIn && isClient && (
                <>
                    <NavLink to="/client/dashboard">Dashboard</NavLink>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </>
            )}
            {isLoggedIn && !isClient && (
                <>
                    <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                </>
            )}

        </div>
    )
}

export default Navigation;