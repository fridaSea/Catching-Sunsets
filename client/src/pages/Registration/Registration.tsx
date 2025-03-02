import React from 'react'
import './Registration.css'

function Registration() {
  return (
    <>
    <div className='wrapper'>
      <h1>Register now!</h1>
   

    <form>
      <div className='form-item'>
        <label htmlFor="username-input">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
        </label>
        <input type="text" id="username-input" name="username" placeholder='Username'/>
      </div>
      
      <div className='form-item'>
        <label htmlFor="email-input">
          <span>@  </span>
        </label>
        <input required type="email" id="email-input" name="email" placeholder='Email'/>
      </div>
      
      <div className='form-item'>
        <label htmlFor="password-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </label>
        <input required type="password" id="password-input" name="password" placeholder='Password'/>
      </div>
      
      <div className='form-item'>
        <label htmlFor="password-input">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </label>
        <input type="password" id="repeat-password-input" name="repeat-password" placeholder='Repeat Password'/>
      </div>

        
        <button type="submit">Register</button>
       
    </form>
    <p>Already have an account? Login 
         <a href="./login"> here</a>
        .</p>
    </div>
{/* <div className='form-container-wrapper'>
      <div className="form-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmitRegistration}>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            // onChange={handleChange}
            required
          />
        </div>
  TO DO - Icon einbauen um das Passwort zu verstecken bzw.anzuzeigen 
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            // onChange={handleChange}
            required
          />
        </div>

        <div>
          <Button type="submit">Register</Button>
        </div>
 BUTTON EINFÜGEN, STYLEN UND NICHT ONCLICK???? 

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
     DO THIS WITH A LITTLE POP UP AND DISPLAY THE MESSAGE THER & WITH AN OKAY BUTTON AND ONCLICK USE THE NAVIGATE TO REDIRECT!!!! 

        <div>
          <p>Already have an account? Login <Link to="/login" className='Link' > here </Link>
          </p>
          
        </div>
      </form>
    </div>
    </div> */}
    </>
  )
}

export default Registration

// modal see: https://www.youtube.com/watch?v=QButPwQ51wQ 
