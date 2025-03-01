import './Footer.css';
import { NavLink } from 'react-router';

function Footer() {
  return (
    <div className='footer-container'>
        {/* DESKTOP FOOTER */}
        <div className='footer'>
            <span className="copyright"> Mady with Love by _frida_sea_ &copy; 2025</span>
        
            <div className="socialIcons">
                <a href="https://www.youtube.com/" target="_blank">
                    <span className="socialicon icon-youtube"></span>
                </a><a href="https://www.instagram.com/" target="_blank">
                    <span className="socialicon icon-instagram"></span>
                </a>
                <a href="https://www.tiktok.com/" target="_blank">
                    <span className="socialicon icon-tiktok"></span>
                </a>
                <a href="https://www.facebook.com/" target="_blank">
                    <span className="socialicon icon-facebook2"></span>
                </a>
            </div>
        </div>
    
{/* MOBILE FOOTER */}
    <div className='bottom-navigation'>    
            <div className='footer-item'>
            <NavLink 
                    to='/' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    >
                    <span className="icon icon-home"></span>
                </NavLink>
            </div>

            <div className='footer-item'>
            <NavLink 
                    to='/sunsets' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    >
                    <span className="icon icon-IconSunset"></span>

                </NavLink>
            </div>

            <div className='footer-item'>
            <NavLink 
                    to='/profile' 
                    className={({isActive}) => isActive ? 'img image-active' : 'img'}
                    >
                    <span className=" icon icon-user"></span>
                </NavLink>
            </div>
      </div>
  </div>
  )
}

export default Footer
