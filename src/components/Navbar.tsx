import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
// import { get, site } from '../utilities'
import Cookies from 'js-cookie'
import booksvg from '/booksvg.svg'
import './Navbar.css'

const isActiveStyle = {
    textDecoration: 'underline 0.1em var(--lighteraccent)',
    color: 'var(--lighteraccent)'
};

function Navbar() {
    const [isLoggedIn, setLogin] = useState(false)
    const [username, setUsername] = useState("")
    useEffect(() => {
        const username: string = Cookies.get("username")!
        const token: string = Cookies.get("token")!
        // console.log(username, token, isLoggedIn)
        if (token) {
            setUsername(username)
            setLogin(true)
        }
    }, []) // If present, effect will only activate if the values in the list change.
    return (
        <>
            <div className="navbar">
                <div className="navlinks">
                    <img src={booksvg} />
                    <NavLink to='/' style={({ isActive }) => isActive ? isActiveStyle : {}}>About</NavLink> {/* https://stackoverflow.com/questions/70187109/activestyle-does-not-exist-on-type-intrinsicattributes */}
                    <NavLink to='/booklist' style={({ isActive }) => isActive ? isActiveStyle : {}}>Listings</NavLink>
                </div>
                {isLoggedIn ? (
                    <div className="loginsignup">
                        <NavLink to='/' style={({ isActive }) => isActive ? isActiveStyle : {}}>Logged in as {username}</NavLink>
                        {/* <NavLink to='/signup' style={({ isActive }) => isActive ? isActiveStyle : {}}>Signup</NavLink> */}
                    </div>
                ) : (
                    <div className="loginsignup">
                        <NavLink to='/login' style={({ isActive }) => isActive ? isActiveStyle : {}}>Login</NavLink>
                        <NavLink to='/signup' style={({ isActive }) => isActive ? isActiveStyle : {}}>Signup</NavLink>
                    </div>
                )}
            </div>
        </ >
    )
}
export default Navbar