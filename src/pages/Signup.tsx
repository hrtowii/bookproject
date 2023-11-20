
import React, { useState, useEffect, useRef } from 'react'
import { post, get } from '../utilities'

const site = "http://localhost:3000/api/v1";

async function ValidatePassword(password: string) {

  var re = {
      'capital' : /[A-Z]/,
      'digit'   : /[0-9]/,
      'special' : /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      'length'  : /.{8,}/,
  };

  return re.capital.test(password) && 
         re.digit.test(password) &&
         re.special.test(password) &&
         re.length.test(password);
} // 1 special symbol, capital alphabet, a number


async function HandleSignup(event: any) {
  try {
    event.preventDefault()
    const data = new FormData(event.target);
    // Access FormData fields with `data.get(fieldName)`
    const username = data.get('username')
    const password = data.get("password") as string
    if (await ValidatePassword(password)) {
      const response = await post(`${site}/register`, {"username": username, "password": password})
      if (response.status = 200) {
        return true
      }
    } else {
      console.log("invalid password!")
      new Error("PasswordError")
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
      <form onSubmit={(event) => HandleSignup(event)}>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
