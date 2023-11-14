// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import booksvg from '/booksvg.svg'
import CoolButton from '../components/CoolButton.tsx'
import './Landing.css'

export function Landing() {
  return (
    <>
    <div className="landing">
      <div>
        <a href="/" target="_blank">
          <img src={booksvg} className="logo" alt="Book logo" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <div id="hero">
        <h1>anybooks?</h1>
      </div>
    </div>
    </>
  )
}

export function LandingContent() {
  return (
    <>
    <div className="content" style={{textAlign: "center", alignItems: "center"}}>
      <div>
        <p>Have you ever wanted to start reading more, only to then forget what books you wanted to read?</p>
        <p>Fret not! With anybooks, you can add any books you find to our page and we'll keep track of them for you.</p>
      </div>
      <CoolButton link='/test'/>
    </div>
    </>
  )
}
