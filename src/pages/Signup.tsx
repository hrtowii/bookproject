import React, { useState } from 'react'
import { post, site } from '../utilities'
import "./Signup.css"
interface PasswordValidity {
  status: 'error' | 'success' | null;
  message?: string;
}

async function ValidatePassword(password: string) {
  var re = {
    'capital': /[A-Z]/,
    'digit': /[0-9]/,
    'special': /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
    'length': /.{8,}/,
  };

  if (re.capital.test(password) &&
    re.digit.test(password) &&
    re.special.test(password) &&
    re.length.test(password)) {
    return true
  }
} // 1 special symbol, capital alphabet, a number

function Signup() {
  const [passwordValidity, setPasswordValidity] = useState<PasswordValidity>({ status: null })
  async function HandleSignup(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const data = new FormData(event.target as HTMLFormElement);
      // Access FormData fields with `data.get(fieldName)`
      const username = data.get('username')
      const password = data.get("password") as string
      if (await ValidatePassword(password)) {
        const response = await post(`${site}/register`, { "username": username, "password": password })
        if (response.status === true) {
          setPasswordValidity({ status: 'success' })
          return passwordValidity
        } else if (response.status === false) { // THIS IS NOT THE RESPONSE CODE. IT IS A KEY NAMED STATUS. I SPENT 1 HOUR
          if (response.ErrorMessage.includes("already exists!")) {
            setPasswordValidity({ status: 'error', message: "Username already exists!" })
          }
        }
      } else {
        setPasswordValidity({ status: 'error', message: "Password requires special symbol, a capital alphabet/number, and at least 8 characters" })
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='content'>
      <div className="signupwrapper">
        <h1>Sign up</h1>
        <div className='inputwrapper'>
          <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => HandleSignup(event)}>
            <div className='loginfield'>
              <p>Username</p>
              <input placeholder="Username" type='text' name="username"></input>
            </div>
            <div className='loginfield'>
              <p>Password</p>
              <input placeholder="Password" type='password' name="password"></input>
            </div>
            <div className='bottompartidk'>
              {passwordValidity.status === 'error' && (
                <div className='registerError'>
                  <p>{passwordValidity.message}</p>
                </div>
              )}
              {passwordValidity.status === 'success' && (
                <div className='registerSuccess'>
                  <p>Successfully registered.</p>
                </div>
              )}
              {passwordValidity.status === null && (
                <div>
                </div> // i need an empty div to push the signup to the right
              )}
              <button type="submit"><h5 style={{ "margin": 0 }}>Sign up</h5></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
