import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <Link to={"/"}>Login</Link>
      <Link to={"/tasks"}>Tasks</Link>
    </nav>
  )
}

export default Navigation