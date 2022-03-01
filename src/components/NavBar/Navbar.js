import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbar">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    );
}
 
export default NavBar;