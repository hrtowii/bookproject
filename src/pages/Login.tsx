import React, { useState, useEffect, useRef } from 'react'
import { post, site } from '../utilities'
import Cookies from 'js-cookie'
import './Signup.css'

interface LoginStatus {
  status: 'error' | 'success' | null;
  message?: string;
}

function Login() {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({status: null})
  async function HandleLogin(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const data = new FormData(event.target as HTMLFormElement);
      // Access FormData fields with `data.get(fieldName)`
      const username = data.get('username')
      const password = data.get("password") as string
      const response = await post(`${site}/login`, {"username": username, "password": password})
      
      if (response.status === true) {
        Cookies.set("username", response.username)
        Cookies.set("token", response.token)
        setLoginStatus({"status": 'success'})
        return loginStatus
      } else {
        switch (response.ErrorMessage) {
          case "Username doesn't exist":
            setLoginStatus({"status": 'error', "message": "Username doesn't exist. Please sign up."})
            break;
          case "Username or password is incorrect!":
            setLoginStatus({"status": 'error', "message": "Username or password incorrect!"})
            break;
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div className='content'>
      <div className="signupwrapper">
        <h1>Log in</h1>
        <div className='inputwrapper'>
          <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => HandleLogin(event)}>
            <div className='loginfield'>
              <p>Username</p>
              <input placeholder="Username" type='text' name="username"></input>
            </div>
            <div className='loginfield'>
              <p>Password</p>
              <input placeholder="Password" type='password' name="password"></input>
            </div>
            <div className='bottompartidk'>
              {loginStatus.status === 'error' && ( // THIS IS NOT THE RESPONSE CODE. IT IS A KEY NAMED STATUS. I SPENT 1 HOUR
                <div className='registerError'>
                  <p>{loginStatus.message}</p>
                </div>
              )}
              {loginStatus.status === 'success' && (
                <div className='registerSuccess'>
                  <p>Successfully logged in.</p>
                </div>
              )}
              {loginStatus.status === null && (
                <div>
                </div> // i need an empty div to push the signup to the right
              )}
              <button type="submit"><h5 style={{ "margin": 0 }}>Log in</h5></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
