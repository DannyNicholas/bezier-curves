import React from 'react'
import logo from '../assets/logo.svg'
import './AppHeader.css'

const AppHeader = () => (
  <div>
    <div className="AppHeader-header">
      <img src={logo} className="AppHeader-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="AppHeader-intro">
      To get started, edit <code>src/App.jsx</code> and save to reload.
    </p>
  </div>
)

export default AppHeader