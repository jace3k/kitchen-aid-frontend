import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <div>
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/about">About</NavLink>
      </nav>
    </div>
  )
}

export default Navigation
