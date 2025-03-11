import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./LoginForm.css";
import {
  LoginCredentials,
  LoginOkResponse,
  User,
} from "../../types/customTypes";
import { baseUrl } from "../../utilities/urls";
import { MenuContext } from "../../context/MenuContext";

function LoginForm() {
  const { isMenuOpen } = useContext(MenuContext);

   // Visibility of the password
   const [showPassword, setShowPassword] = useState(false);
   const handleShowPassword = () => {
     setShowPassword(!showPassword);
   };

   const [user, setUser] = useState<User | null>(null);
   
  //  const [loginCredentials, setLoginCredentials] =
  //   useState<LoginCredentials | null>(null);
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  // User (below) should be in the Auth Context TO DO
  const [fieldErrors, setFieldErrors] = useState({
    email: '', 
    password: '',
  });
 

 const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLoginCredentials({
    ...loginCredentials!,
    [e.target.name]: e.target.value,
  });
}

  const validateField = (name: string, value: string) => {
    if (name === "email"){
      if(!/.{6,}/.test(value)){
        return "Your E-Mail Adress must at least has 6 characters."
      } else if(!/.*@.*/.test(value)){
        return "This is not a valid email adress"
      }
    }
    if (name === "password" && value.length < 6){
      return "Your password should have at least 6 characters"
    }
    return '';
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    // const update  = {
    //   email: fieldErrors.email, 
    //   password: fieldErrors.password,
    // }
    // update[name] = errorMessage;
    setFieldErrors({...fieldErrors, [name]: errorMessage});
  }

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
      // if token is there, we gonna store it in the local storage of the browser
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
      className={`loginForm component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div className="wrapper">
        <h1>Login</h1>
        
        {/* <form action=""></form> */}
        <form className="login-form" onSubmit={submitLogin}>

          <div className={`form-item ${fieldErrors.email? 'incorrect' : ''}`}>
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
            {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
          </div>

          <div className={`form-item ${fieldErrors.password ? 'incorrect' : ''}`}>
            <div className="input-wrapper">
            <label htmlFor="password-input">
              <span className="icon icon-lock"></span>
            </label>
            <input
              required
              // type="password"
              type={(showPassword === true)? "text": "password"}
              id="password-input"
              name="password"
              placeholder="Password"
              onChange={handleLoginInputChange}
              onBlur={handleBlur}
            />
             <div className="password-eye">
              {showPassword ? (
                <span className="icon icon-visibility" onClick={handleShowPassword} />
              ) : (
                <span className="icon icon-visibility_off" onClick={handleShowPassword} />
              )}
            </div>
            {/* <div className="password-eye">
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
            </div> */}
            </div>
            {fieldErrors.password && <div className="error">{fieldErrors.password}</div>}
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
