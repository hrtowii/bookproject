// import React, { useState, useEffect, useRef } from 'react'
import { post, site } from '../utilities'
import Cookies from 'js-cookie'

async function HandleLogin(event: React.FormEvent<HTMLFormElement>) {
  try {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement);
    // Access FormData fields with `data.get(fieldName)`
    const username = data.get('username')
    const password = data.get("password") as string
    const response = await post(`${site}/login`, {"username": username, "password": password})
    if (response.status = 200) {
      const stuff = {"username": response.username, "token": response.token} // im doing this stupid thing so i can add username to navbar 
      return stuff
    }
  } catch (e) {
    console.log(e)
  }
}
function Login() {
  return (
    <div className='content'>
      <h1>Log in</h1>
      <form onSubmit={
          async (event) => {
            const stuff = await HandleLogin(event)
            Cookies.set('authToken', stuff?.token);
            Cookies.set("username", stuff?.username)
          }
        }>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
