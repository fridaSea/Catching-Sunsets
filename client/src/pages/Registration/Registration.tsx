import React from 'react'

function Registration() {
  return (
    <>
    <div>
      <h1>Register now!</h1>
    </div>

    <form>
        <input type="email" id="email" name="email" placeholder='E-Mail Adress'/>
        <input type="text" id="password" name="password" placeholder='Password'/>
        <button type="submit">Register</button>
    </form>
    </>
  )
}

export default Registration

// modal see: https://www.youtube.com/watch?v=QButPwQ51wQ 
