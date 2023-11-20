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
  const [passwordValidity, setPasswordValidity] = useState<PasswordValidity>({status: null})
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
          setPasswordValidity({status: 'success'})
          return passwordValidity
        } else if (response.status === false) { // THIS IS NOT THE RESPONSE CODE. IT IS A KEY NAMED STATUS. I SPENT 1 HOUR
          if (response.ErrorMessage.includes("already exists!")) {
            setPasswordValidity({status: 'error', message: "Username already exists!"})
          }
        }
      } else {
        setPasswordValidity({status: 'error', message: "Password requires special symbol, a capital alphabet/number, and at least 8 characters"})
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='content'>
      <h1>Sign up</h1>
      {/* <h2>{data?.message}</h2> */}
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => HandleSignup(event)}>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Signup</button>
      </form>
      {passwordValidity.status === 'error' && (
        <div className='registerError'>
          <h5 style={{"margin": 0}}>Invalid password!</h5>
          <p>{passwordValidity.message}</p>
        </div>
      )}
      {passwordValidity.status === 'success' && (
        <div className='registerSuccess'>
          <h5 style={{"margin": 0}}>Successfully registered.</h5>
        </div> // refactor to component later and pass in as propr
      )}
    </div>
  )
}

export default Signup
