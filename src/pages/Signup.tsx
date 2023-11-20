
import React, { useState, useEffect, useRef } from 'react'
import { post, site } from '../utilities'

async function ValidatePassword(password: string) {
  // const [passwordValidity, setPasswordValidity] = useState(false)
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
    // setPasswordValidity(true)
    return true
  }
} // 1 special symbol, capital alphabet, a number


async function HandleSignup(event: React.FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement);
    // Access FormData fields with `data.get(fieldName)`
    const username = data.get('username')
    const password = data.get("password") as string
    let passwordValidity = false
    if (await ValidatePassword(password)) {
      const response = await post(`${site}/register`, { "username": username, "password": password })
      if (response.status === 200) {
        passwordValidity = true
        return true
      }
    } else {
      console.log("invalid password!")
    }
  } catch (e) {
    console.log(e);
  }
}
function Signup() {
  return (
    <div className='content'>
      <h1>Sign up</h1>
      {/* <h2>{data?.message}</h2> */}
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => HandleSignup(event)}>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
