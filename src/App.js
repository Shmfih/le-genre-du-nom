import React from 'react'
import './App.css'
import MainPage from './containers/MainPage'
require('dotenv').config()

function App () {
  console.clear()
  return (
    <div className='App'>
      <div className='header'>
        <h4>Quel genre de ce nom?</h4>
      </div>
      <MainPage />
      {/* <div className='footer'>Copyright © 2020 by Huynh Thien Tan.</div> */}
    </div>
  )
}

export default App
