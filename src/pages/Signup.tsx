import React, { useState, useEffect } from 'react'

function Signup() {
  const [data, setData] = useState(null);
  const site = "http://localhost:3000";
  useEffect(() => {
    fetch(site+"/api/v1/hello", {mode: 'cors'})
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])
  return (
    <div className='content'>
      <h1>Sign up</h1>
      <h2>{JSON.stringify(data)}</h2>
    </div>
  )
}

export default Signup
