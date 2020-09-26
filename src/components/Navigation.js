import React from 'react'
import { NavLink } from 'react-router-dom'
import s from '../styles/navigation.module.css'

const Navigation = () => {
  return (
    <div>
      <nav>
        <NavLink className={s.link} activeClassName={s.linkActive} exact to="/">Home</NavLink>
        <NavLink className={s.link} activeClassName={s.linkActive} exact to="/about">About</NavLink>
      </nav>
    </div>
  )
}

export default Navigation
