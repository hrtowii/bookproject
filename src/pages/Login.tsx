// import React, { useState, useEffect, useRef } from 'react'
import { post, get } from '../utilities'

const site = "http://localhost:3000/api/v1";

async function HandleSignup(event: any) {
  event.preventDefault()
  const data = new FormData(event.target);
  // Access FormData fields with `data.get(fieldName)`
  const username = data.get('username')
  const password = data.get("password") as string
  const response = await post(`${site}/login`, {"username": username, "password": password})
  if (response.status = 200) {
    return true
  }
}
function Login() {
  return (
    <div className='content'>
      <h1>Log in</h1>
      <form onSubmit={(event) => HandleSignup(event)}>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
