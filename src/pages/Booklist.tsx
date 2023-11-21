import React, {useEffect, useState} from 'react'
import Bookcard from '../components/Bookcard.tsx'
import {post, get} from "../utilities"
import './Booklist.css'
export default function Booklist() {
    useEffect(() => {

    }, [])
    return (
        <div className='content'>
            <div className='booklistwrapper'>
                <div className='leftside'>
                <h1 style={{display: 'inline-block'}}>Books</h1>
                    <a>hi</a>
                </div>
                <div className='rightside'>
                    <div className='verticalsplit'>
                        <Bookcard 
                            imageURL={'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg'}
                            title={'A Court of Thorns and Roses'}
                            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                            author={'Sarah J. Maas'}
                            notes={'When the impostor is sussy!'}
                        />
                        <Bookcard 
                            imageURL={'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg'}
                            title={'A Court of Thorns and Roses'}
                            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                            author={'Sarah J. Maas'}
                            notes={'When the impostor is sussy!'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
