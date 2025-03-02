import './LoginForm.css'

function LoginForm() {
  return (
    <div className='wrapper'>
      <h1>Login</h1>
      {/* <form action=""></form> */}
      <form className='login-form'>
        <div>
           {/* <label htmlFor="email">Email:</label> */}
        <input required type="email" id="email-input" name="email" placeholder='E-Mail Adress'/>
        </div>
       
       <div>
        {/* <label htmlFor="password">Password:</label> */}
        <input required type="password" id="password-input" name="password" placeholder='Password'/>
       </div>
        
        <button type="submit">Login</button>
      </form>
      <p>Don`t have an account? Register  
         <a href="./registration"> here</a>
        .</p>

    </div>
  )
}

export default LoginForm
