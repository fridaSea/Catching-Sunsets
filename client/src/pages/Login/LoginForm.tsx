import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./LoginForm.css";
import { LoginCredentials, User } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";
import { loginUserApi } from "../../api/authorisation";
import { useNavigate } from "react-router";
import { Alert, Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthorizationContext";

function LoginForm() {
  const { isMenuOpen } = useContext(MenuContext);
  const authContext = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // REVIEW don't leave unsed variables behind
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<Error | null>(null);

  const [loading, setLoading] = useState(null);

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  // User (below) should be in the Auth Context TO DO
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  // https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
  // function refreshPage() {
  //   window.location.reload(false);
  // }

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });
  };

  // REVIEW DRY principle. You use a very similar finction in Registration. Make it reusable
  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!/.{6,}/.test(value)) {
        return "Your E-Mail Adress must at least has 6 characters.";
      } else if (!/.*@.*/.test(value)) {
        return "This is not a valid email adress";
      }
    }
    if (name === "password" && value.length < 6) {
      return "Your password should have at least 6 characters";
    }
    return "";
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);

    setFieldErrors({ ...fieldErrors, [name]: errorMessage });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authContext.login(
        loginCredentials.email,
        loginCredentials.password
      );
      // Redirect
      // navigate("/profile");
      // setTimeout(() => {
      //   navigate("/profile"); // Zur Liste der Sunsets navigieren
      // }, 2500); // Wartezeit für Snackbar
      // Erfolgreiche Update-Bestätigung
      setSnackbarMessage("Login was successfull!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/profile"); // Zur Liste der Sunsets navigieren
      }, 2000); // Wartezeit für Snackbar
    } catch (error) {
      console.log("error :>> ", error);
      setLoginError(error);
      setSnackbarMessage("Failed to login!");
      setOpenSnackbar(true);
    }
  };
  // TO DO - Login sucessfull - Redirect to some Page

  // TO DO - Logout button - also has to be moved
  const logout = () => {
    localStorage.removeItem("token");
    // setUser(null) -> in the AuthCOntext
  };
  return (
    <div
      className={`loginForm component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div className="wrapper">
        <h1>Login</h1>

        <form className="login-form" onSubmit={submitLogin}>
          <div className={`form-item ${fieldErrors.email ? "incorrect" : ""}`}>
            <div className="input-wrapper">
              <label htmlFor="email-input">
                <span className="icon icon-send"></span>
              </label>
              <input
                required
                type="email"
                id="email-input"
                name="email"
                placeholder="E-Mail Adress"
                onChange={handleLoginInputChange}
                onBlur={handleBlur}
              />
            </div>
            {fieldErrors.email && (
              <div className="error">{fieldErrors.email}</div>
            )}
          </div>

          <div
            className={`form-item ${fieldErrors.password ? "incorrect" : ""}`}
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
                onChange={handleLoginInputChange}
                onBlur={handleBlur}
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
          </div>

          <button type="submit">Login</button>
          {loginError?.message && (
            <div className="error">{loginError.message}</div>
          )}
        </form>
        <p>
          Don`t have an account? Register
          <a href="./registration"> here</a>.
        </p>
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
      </div>
    </div>
  );
}

export default LoginForm;
