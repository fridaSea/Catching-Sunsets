import { useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router';
// import profile_icon from '../../../public/profile_icon.png'


// Responsive Navbar with animated hamburger menu
function Navbar() {
    // const {user, login, logout} = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openMenu = () => {
      setIsOpen(!isOpen);
    }


  return (
    <header className='header'>
        <div className='header-content'>
            <div className='logo-container'>
            <a href='/' className='logo'>Catching Sunsets</a>
            </div>
            
            <div className='nav-container'>
            <nav className={"nav " + (isOpen ? 'nav--open' : '')} >
                <ul className='nav-list'>
                    
                    <li className='nav-item'>
                        <NavLink 
                        to='/sunsets' 
                        className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'}
                        onClick={() => setIsOpen(false)}
                        >
                            Sunsets
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink 
                        to='/registration' 
                        className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'}
                        onClick={() => setIsOpen(false)}>
                            Registration
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink 
                        to='/profile' 
                        className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'} 
                        onClick={() => setIsOpen(false)}
                        >
                            Profile
                            {/* <img src={profile_icon} alt="Profile-Icon" /> */}
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </div>

        <div className={`hamburger-menu ${isOpen ? 'hamburger-menu--open' : ''}`}
             onClick={openMenu} >
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
        </div>
         
         
    </header>
  )
}

export default Navbar
