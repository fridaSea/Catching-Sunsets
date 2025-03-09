import { Form } from "react-router";
import { MenuContext } from "../../context/MenuContext";
import { useContext, useEffect } from 'react'
import {AuthContext} from '../../context/AuthorizationContext'

function Profile() {
    const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  // TO DO - WARUM ?? && Wie bekomme ich es hin, dass ich auf Profile in der Navbar klicke und das alles erscheint und nicht auf den Button "Get Profile"?
  //const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const { loggedUser, getUserProfile } = useContext(AuthContext);
  //console.log('loggedUser :>> ', loggedUser);
  // console.log('result.user :>> ', result.user)

   // useEffect wird einmalig beim ersten Laden der Komponente ausgeführt
   useEffect(() => {
    // Profilinformationen automatisch abrufen, wenn die Seite geladen wird
    getUserProfile();
  }, [getUserProfile]); // Die Funktion getUserProfile wird nur einmal aufgerufen, wenn die Komponente geladen wird

  return (
    <div
      className={`component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h1>Your Profile</h1>

    <br />
      {/* <button onClick={getUserProfile}>Get Profile</button> */}

    {/* if we have a user  */}
     {loggedUser && <div>
          <h2>Hi {loggedUser.username}</h2>
          <img src={loggedUser.img} alt="users profile pic" style={{width:"150px", height:"auto"}}/>
         <p>PLACEHOLDER - IMAGE UPLOAD</p>
         <br />
          <p>E-Mail: {loggedUser.email}</p> 
          <p>Username: {loggedUser.username}</p>
        </div>
         } 

    </div>
  );
}

export default Profile;
