import React, { useState, useEffect } from 'react'
import { Form } from 'react-router-dom'

function validatePassword(password: string) {
  var re = {
      'capital' : /[A-Z]/,
      'digit'   : /[0-9]/,
      'special' : /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      'length'  : /.{8,}/, // Minimum length of 8 characters
  };

  return re.capital.test(password) && 
         re.digit.test(password) &&
         re.special.test(password) &&
         re.length.test(password);
}

function 

function Signup() {
  const [data, setData] = useState({message: "Loading..."});
  const site = "http://localhost:3000";
  useEffect(() => { // on page load fetch data from api
    fetch(site+"/api/v1/hello", {mode: 'cors'})
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])
  return (
    <div className='content'>
      <h1>Sign up</h1>
      <h2>{data?.message}</h2>
      <Form method="post" action="/api/v1/register">
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Signup</button>
      </Form>
    </div>
  )
}

export default Signup
