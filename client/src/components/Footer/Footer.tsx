import facebook from '../../assets/facebook50.png';
import instagram from '../../assets/instagram50.png';
import youtube from '../../assets/youtube50.png';
import tiktok from '../../assets/tiktok50.png';
import './Footer.css';
import { NavLink } from 'react-router';
import homeIcon from '../../assets/homeIcon.png'
import sunsetIcon from '../../assets/sunsetIcon.png'
import profileIcon from '../../assets/profileIcon.png'
import homeIconSimple48 from '../../assets/homeIconSimple48.png'
import sunset48 from '../../assets/sunset48.png'
import profile48 from '../../assets/profile48.png'

function Footer() {
  return (
    <div className='footer-container'>
        {/* DESKTOP FOOTER */}
        <div className='footer'>
            <span className="copyright"> Mady with Love by _frida_sea_ &copy; 2025</span>
        
        <div className="socialIcons">
            <a href="https://www.instagram.com/" target="_blank"><img src={instagram} alt="Instagram-LinkIcon"/></a>
            <a href="https://www.facebook.com/" target="_blank"><img src={facebook} alt="Facebook-LinkIcon"/></a>
            <a href="https://www.youtube.com/" target="_blank"><img src={youtube} alt="Youtube-LinkIcon"/></a>
            <a href="https://www.tiktok.com/" target="_blank"><img src={tiktok} alt="Tiktok-LinkIcon"/></a>
        </div>

        </div>
    
{/* MOBILE FOOTER */}
    <div className='bottom-navigation'>    
        {/* <div className='bottom-navigation-mobile'>    */}
            <div className='footer-item'>
            <NavLink 
                    to='/' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={homeIconSimple48} alt="Home Icon with Link" />
                    {/* <img src={homeIcon} alt="Home Icon with Link" /> */}
                </NavLink>
            </div>

            <div className='footer-item'>
            <NavLink 
                    to='/sunsets' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={sunset48} alt="Sunset Icon with Link" />
                    {/* <img src={sunsetIcon} alt="Sunset Icon with Link" /> */}
                </NavLink>
            </div>

            <div className='footer-item'>
            <NavLink 
                    to='/profile' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    // className={({isActive}) => isActive ? 'nav-link bottom-active' : 'nav-link'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={profile48} alt="Profil Icon with Link" />
                    {/* <img src={profileIcon} alt="Profil Icon with Link" /> */}
                </NavLink>
            </div>
            
             {/* <ul>
                <li>
                <NavLink 
                    to='/' 
                    // className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={homeIcon32} alt="Home Icon with Link" />
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to='/sunset' 
                    // className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={sunset48} alt="Sunset Icon with Link" />
                </NavLink>
                </li>
                <li>
                <NavLink 
                    to='/profile' 
                    // className={({isActive}) => isActive ? 'nav-link nav-active' : 'nav-link'}
                    // onClick={() => setIsOpen(false)}
                    >
                    <img src={profile48} alt="Sunset Icon with Link" />
                </NavLink>
                </li>
            </ul> */}

        {/* </div> */}
        
        {/* <p>Home</p>
        
        <NavLink 
            className='bottom-navigation-action'
            to='/home' 
            >
            icon={Home}
        </NavLink> */}
        
        {/* <BottomNavigation 
          showLabels
          value={value}
         
        >
        <BottomNavigationAction className='bottom-navigation-action'
            label="Home" 
            value={value}
            onClick={() =>navigate("/")
            }
            icon={<HomeIcon className='action-icon'/>}
             />
        <BottomNavigationAction label="Chat" value={value} onClick={() =>navigate("/chat")
            } icon={<ChatIcon className='action-icon'/>} />
        </BottomNavigation> */}
      </div>



  </div>
  )
}

export default Footer
