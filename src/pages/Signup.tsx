import React, { useState, useEffect } from 'react'
import { Form } from 'react-router-dom'
import { postData } from '../utilities';
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

postData("https://example.com/answer", { answer: 42 })
.then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});


function Signup() {
  const site = "http://localhost:3000";
  const [data, setData] = useState({message: "Loading..."});
  useEffect(() => { // on page load fetch data from api
    fetch(site+"/api/v1/hello", {mode: 'cors'})
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])
  return (
    <div className='content'>
      <h1>Sign up</h1>
      <h2>{data?.message}</h2>
      <form onSubmit={e => e.preventDefault()} method="post" action={`${site}/api/v1/register`}>
        <input type='text' name="username"></input>
        <input type='text' name="password"></input>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
