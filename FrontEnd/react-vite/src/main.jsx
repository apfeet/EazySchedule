import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import logo from "./assets/ES_logo.png"
import Button from "./components/Button.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/*NavBar*/}
    <div className='NavBarContainer'>
      <img className="NavBarContainer_Logo" src={logo}></img>
      <div className="NavBarContainer_ContainerCenterItems">
        <Button />
      </div>
    </div>
  </>
)
