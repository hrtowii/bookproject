import React from 'react'
import {NavLink} from 'react-router-dom';
import booksvg from '/booksvg.svg'
import './Navbar.css'

const isActiveStyle = {
    textDecoration: 'underline 0.1em var(--lighteraccent)',
    color: 'var(--lighteraccent)'
};

function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="navlinks">
                    <img src={booksvg}/>
                    <NavLink to='/' style={({ isActive }) => isActive ? isActiveStyle : {}}>About</NavLink> {/* https://stackoverflow.com/questions/70187109/activestyle-does-not-exist-on-type-intrinsicattributes */}
                    <NavLink to='/test' style={({ isActive }) => isActive ? isActiveStyle : {}}>Listings</NavLink>
                </div>
                <div className="loginsignup">
                    <NavLink to='/login' style={({ isActive }) => isActive ? isActiveStyle : {}}>Login</NavLink>
                </div>
                
                
            </div>
        </ >
    )
}
export default Navbar