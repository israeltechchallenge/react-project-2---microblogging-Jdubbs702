import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Btn from '../../UIKit/Elements/Btn/Btn';

const NavBar = () => {
    const {isLoggedIn, signout} = useContext(AuthContext);
    return (
        <div className="navbar">
            {isLoggedIn ? <>
                <div><NavLink to="/">Home</NavLink>
                <NavLink to="/profile" className='profile-link'>Profile</NavLink></div>
                <div className='signout-button'>{isLoggedIn && <Btn onClick={signout}>Signout</Btn>}</div> </>
                :<>
                <NavLink to="/login" className='login-link'>Login</NavLink>
                <NavLink to="/signup" className='signup-link'>Signup</NavLink></>
            }  
        </div>
    );
}

export default NavBar;