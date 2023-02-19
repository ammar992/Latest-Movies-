import React from 'react'
import './Header.css'



function Header() {
  return (
    <div>
      <h1 className='header' onClick={()=>{window.scroll(0,0)}}>
        Entetainment
        </h1>
    </div>
  )
}

export default Header