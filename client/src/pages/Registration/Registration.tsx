import { ChangeEvent, FormEvent, useContext, useState } from "react";
// import { MenuContext } from "../../context/MenuContext";
import "./Registration.css";
import { RegisterOkResponse, UserRegisterForm } from "../../types/customTypes";
import { baseUrl } from "../../utilities/urls";
import { MenuContext } from "../../context/MenuContext";
import { useNavigate } from "react-router";
import { Alert, Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthorizationContext";
// import RegistrationSunset from '../../../public/RegistrationSunset.jpeg'

function Registration() {
  const { isMenuOpen } = useContext(MenuContext);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  //new User
  const [newUser, setNewUser] = useState<UserRegisterForm | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //To DO - confirmation for registration - we should have in our AuthContext our user, that we will bring from AuthContext - if you want to leave your user logged in after the registration (Min 19 - Video Mongoose model validation & Image preview or it is called "second part" not sure)

  const handleShowRepeatedPassword = () => {
    setShowRepeatedPassword(!showRepeatedPassword);
  };

  const handleRegisterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const validateField = (name: string, value: string) => {
    if (name === "username" && !/[A-Za-z0-9]{3,16}/.test(value)) {
      return "Your Username can contain numbers and normal characters and should be 3-16 characters long.";
    }
    if (name === "email") {
      if (!/.{6,}/.test(value)) {
        return "Please enter a valid E-Mail Adress with at least 6 characters.";
      } else if (!/.*@.*/.test(value)) {
        return "This is not a valid email adress";
      }
    }
    if (name === "password" && value.length < 6) {
      return "Your password needs to have at least 6 characters.";
    }
    if (name === "repeatedPassword" && newUser && newUser.password !== value) {
      return "The Passwords do not match.";
    }
    return "";
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    // const update  = {
    //   username: fieldErrors.username,
    //   email: fieldErrors.email,
    //   password: fieldErrors.password,
    //   repeatedPassword: fieldErrors.repeatedPassword,
    // }
    // update[name] = errorMessage;
    setFieldErrors({ ...fieldErrors, [name]: errorMessage });
  };

  const { login } = useContext(AuthContext);
  const submitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("newUser :>> ", newUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // TO DO - Do not forget to do Input validation (user has to be proper email, username lenght, if there, password should contain at least xy characters/ letters, numbers and symbols )
    if (newUser) {
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
    } else {
      console.log("no empty forms allowed");
    }
    // TO DO - if the required fields are not fulfilled, then a message and register with Register Button should not be possible

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/register`,
        requestOptions
      );
      const result = (await response.json()) as RegisterOkResponse;

      if (response.status < 400) {
        // Erfolgreiche registrierung
        //setUser(result.user);
        // Erfolgreiche Registrierung
        setSnackbarMessage("Registration was successful!");
        setOpenSnackbar(true);

        // Benutzer nach erfolgreicher Registrierung automatisch einloggen
        await login(newUser?.email!, newUser?.password!);

        // Warte, bis die Snackbar geschlossen ist, bevor weitergeleitet wird
        setTimeout(() => {
          navigate("/profile");
        }, 2500);

        // Warte, bis die Snackbar geschlossen ist, bevor weitergeleitet wird
        setTimeout(() => {
          navigate("/profile");
        }, 2500); // Warten, bis die Snackbar vollständig angezeigt wird
      } else {
        // ERROR MESSAGE - Coming from the Backend
        console.log(result.message);
        setError(result.message);
      }
    } catch (error) {
      console.log("error :>> ", error);
      setSnackbarMessage("Failed to register!");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div
        className={`registration component-content-container ${
          isMenuOpen ? "content-container-menu-open" : ""
        }`}
      >
        <div className="wrapper">
          <h1>Register now!</h1>

          <form onSubmit={submitRegister}>
            {/* TO DO Full Name noch als Beispiel für die Vorlage mit aufnehmen https://ukpaiudoprecious0.medium.com/master-form-validation-in-react-js-2b4b163932f5 */}

            <div
              className={`form-item ${fieldErrors.username ? "incorrect" : ""}`}
            >
              <div className="input-wrapper">
                <label htmlFor="username-input">
                  <span className="icon icon-user"></span>
                </label>
                <input
                  type="text"
                  id="username-input"
                  name="username"
                  placeholder="Username"
                  // pattern="^[A-Za-z0-9]{3,16}$"
                  // allow the user to make use of any characters apart from special characters and whitespaces
                  onChange={handleRegisterInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {/* <div className="error">Your Username can contain numbers and normal characters and should be 3-16 Characters long</div> */}
              {fieldErrors.username && (
                <div className="error">{fieldErrors.username}</div>
              )}
            </div>

            <div
              className={`form-item ${
                fieldErrors.email?.length > 0 ? "incorrect" : ""
              }`}
            >
              <div className="input-wrapper">
                <label htmlFor="email-input">
                  <span className="icon icon-send"></span>
                </label>
                <input
                  required
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder="Email"
                  // pattern=".{6,}"
                  onChange={handleRegisterInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {/* <div className="error">This is not a valid Email Adress. You E-Mail Adress must at least has 6 characters.</div> */}
              {fieldErrors.email && (
                <div className="error">{fieldErrors.email}</div>
              )}
            </div>

            <div
              className={`form-item ${
                fieldErrors.password?.length > 0 ? "incorrect" : ""
              }`}
            >
              <div className="input-wrapper">
                <label htmlFor="password-input">
                  <span className="icon icon-lock"></span>
                </label>
                <input
                  required
                  type={showPassword === true ? "text" : "password"}
                  id="password-input"
                  name="password"
                  placeholder="Password"
                  // pattern=".{6,}"
                  onChange={handleRegisterInputChange}
                  onBlur={handleBlur}

                  // LIVE
                  //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
                  //TESTING
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
                  // you checked if the password contains, a lowercase and uppercase letter, a number, and any special character, and also if the password is up to 6 characters long.
                />
                <div className="password-eye">
                  {showPassword ? (
                    <span
                      className="icon icon-visibility"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <span
                      className="icon icon-visibility_off"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
              {fieldErrors.password && (
                <div className="error">{fieldErrors.password}</div>
              )}
              {/* LIVE */}
              {/* <div className="error">A strong password should have at least one <br /> uppercase and lowercase letter, one number and any <br /> special character and should be at least 6 characters</div> */}
              {/* TESTING */}
              {/* <div className="error">Your password should have at least 6 characters</div> */}
              {/* <div className="password-eye">
        {(showPassword === true)? 
        <span className="icon icon-visibility" onClick={handleShowPassword}/> : <span className="icon icon-visibility_off" onClick={handleShowPassword}/>}
        </div> */}
            </div>

            <div
              className={`form-item ${
                fieldErrors.repeatedPassword?.length > 0 ? "incorrect" : ""
              }`}
            >
              <div className="input-wrapper">
                <label htmlFor="repeated-password-input">
                  <span className="icon icon-lock"></span>
                </label>
                <input
                  required
                  // type="password"
                  type={showRepeatedPassword ? "text" : "password"}
                  id="repeat-password-input"
                  name="repeatedPassword"
                  placeholder="Repeat Password"
                  pattern={newUser?.password}
                  onPaste={(e) => {
                    e.preventDefault();
                    false;
                  }}
                  // Password zur wiederholung reinkopieren ist hiermit nicht möcglich
                  onChange={handleRegisterInputChange}
                  onBlur={handleBlur}
                />
                <div className="password-eye">
                  {showRepeatedPassword ? (
                    <span
                      className="icon icon-visibility"
                      onClick={handleShowRepeatedPassword}
                    />
                  ) : (
                    <span
                      className="icon icon-visibility_off"
                      onClick={handleShowRepeatedPassword}
                    />
                  )}
                </div>
              </div>
              {fieldErrors.repeatedPassword?.length > 0 && (
                <div className="error">{fieldErrors.repeatedPassword}</div>
              )}
              {/* <div className="error">Passwords does not match</div> */}
              {/* <div className="password-eye">
        {(showRepeatedPassword === true)? 
        <span className="icon icon-visibility" onClick={handleShowRepeatedPassword}/> : <span className="icon icon-visibility_off" onClick={handleShowRepeatedPassword}/>}
        </div> */}
            </div>

            {/* <button type="submit">Register</button>
        {error ? error : ''} */}
            <button
              type="submit"
              disabled={Object.values(fieldErrors).some(
                (error) => error !== ""
              )}
            >
              Register
            </button>
            {error && <div>{error}</div>}
          </form>

          <p>
            Already have an account?
            <a href="./login"> Login.</a>
          </p>
        </div>
      </div>
      {/* Snackbar für Bestätigungsmeldungen */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Dauer für die Anzeige der Snackbar
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("Failed") ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* <div>
      <img className="background-image" src={RegistrationSunset} alt="Sunsetpicture on Registrationpage" />
    </div> */}
    </>
  );
}

export default Registration;

// modal see: https://www.youtube.com/watch?v=QButPwQ51wQ
