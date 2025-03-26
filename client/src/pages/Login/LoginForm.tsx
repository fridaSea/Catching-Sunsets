import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./LoginForm.css";
import { LoginCredentials } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";
import { useNavigate } from "react-router";
import { Alert, Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthorizationContext";

function LoginForm() {
  const { isMenuOpen } = useContext(MenuContext);
  const authContext = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // Visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loginError, setLoginError] = useState<Error | null>(null);

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });
  };

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

      setSnackbarMessage("Login was successfull!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.log("error :>> ", error);
      setLoginError(error);
      setSnackbarMessage("Failed to login!");
      setOpenSnackbar(true);
    }
  };

  return (
    <div
      className={`login-form component-content-container ${
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
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
