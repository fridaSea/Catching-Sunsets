import { ChangeEvent, FormEvent, useState } from "react";
import "./LoginForm.css";
import {
  LoginCredentials,
  LoginOkResponse,
  User,
} from "../../types/customTypes";
import { baseUrl } from "../../utilities/urls";

function LoginForm() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);
  // User (below) should be in the Auth Context TO DO
  const [user, setUser] = useState<User | null>(null);

  // Visibility of the password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    console.log("e.target.value :>> ", e.target.value);

    setLoginCredentials({
      ...loginCredentials!,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('loginCredentials :>> ', loginCredentials);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    // TO DO - Do not forget to do Input validation (user has to be proper email, username lenght, if there, password should contain at least xy characters/ letters, numbers and symbols )
    if (loginCredentials) {
      urlencoded.append("email", loginCredentials.email);
      urlencoded.append("password", loginCredentials.password);
    } else {
      console.log("no empty forms allowed");
    }
    // TO DO - if the required fields are not fulfilled, then a message and register with Register Button should not be possible

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      // redirect: "follow"
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/login`,
        requestOptions
      );
      const result = (await response.json()) as LoginOkResponse;
      console.log("result :>> ", result);
      alert(result.message);
      if (!result.token) {
        // TO DO - do something about it
      }
      // if token is there, we gonna store it in th elocal storage of the browser
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      setUser(result.user);

      // if(response.status < 400){
      //   // console.log(result.message)
      //   alert(result.message);
      // } else {
      //   // ERROR MESSAGE - Coming from the Backend
      //   console.log(result.message);
      //   setError(result.message)
      // }
    } catch (error) {
      console.log("error :>> ", error);
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
      className={`component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div className="wrapper">
        <h1>Login</h1>
        {/* <form action=""></form> */}
        <form className="login-form" onSubmit={submitLogin}>
          <div className="form-item incorrect">
            <label htmlFor="email-input">
              <span className="icon icon-send"></span>
            </label>
            <input
              required
              type="email"
              id="email-input"
              name="email"
              placeholder="E-Mail Adress"
            />
          </div>

          <div className="form-item incorrect">
            <label htmlFor="password-input">
              <span className="icon icon-lock"></span>
            </label>
            <input
              required
              type="password"
              id="password-input"
              name="password"
              placeholder="Password"
            />
            <div className="password-eye">
              {showPassword === true ? (
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

          <button type="submit">Login</button>
        </form>
        <p>
          Don`t have an account? Register
          <a href="./registration"> here</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
