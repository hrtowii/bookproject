import React, {useEffect, useState} from 'react'
import {post, get} from "../utilities"
import './Booklist.css'
export default function Booklist() {
    useEffect(() => {

    }, [])
    return (
        <div className='content'>
            <h1>Books</h1>
            <div className='booklistwrapper'>
                <div className='leftside'>
                    <a>hi</a>
                </div>
                <div className='rightside'>
                    <div className='verticalsplit'>
                        <div className='bookListing'>
                            <a>hi</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
