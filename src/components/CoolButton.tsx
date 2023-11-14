import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import {Link} from 'react-router-dom'

import './CoolButton.css'
CoolButton.defaultProps = {
    text: "Get started",
    link: "https://google.com"
  };
export default function CoolButton(props: { link: string, text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) {
    return (
    <>
      <Link to={props.link}>
        <button className="ios-15">
        <div className="wrapper">
            <span>{props.text}</span>
            <div className="circle circle-12"></div>
            <div className="circle circle-11"></div>
            <div className="circle circle-10"></div>
            <div className="circle circle-9"></div>
            <div className="circle circle-8"></div>
            <div className="circle circle-7"></div>
            <div className="circle circle-6"></div>
            <div className="circle circle-5"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-1"></div>
        </div>
      </button>
      </Link>
    </>
    )
  }