import { FormEvent, useContext, useState } from "react";
import "./LoginForm.css";
import { User } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";

function LoginForm() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [newUser, setNewUser] = useState<UserRegisterForm | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
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
      // redirect: "follow"
    };

    try {
      const response = await fetch(
        "http://localhost:4004/api/users/register",
        requestOptions
      );
      const result = (await response.json()) as RegisterOkResponse;

      if (response.status < 400) {
        // console.log(result.message)
        alert(result.message);
        setUser(result.user);
      } else {
        // ERROR MESSAGE - Coming from the Backend
        console.log(result.message);
        setError(result.message);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
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
