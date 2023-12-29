import React, {useEffect, useState} from 'react'
import NavigationBar from './components/NavigationBar'
import Intro from './components/Intro'
import MainKnapsack from './components/MainKnapsack'

import './style/LandingPage.css'

function App() {
  const [backendData, setBackendData] = useState([{}])
  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      {/* Intro Section */}
      <div className="myBG">
        <NavigationBar/>
        <Intro/>
      {/* end of Intro  */}


      {/* Material Section */}

      {/* end of Material  */}


      {/* MainKnapsack Section */}
        <MainKnapsack/>
      {/* end of MainKnapsack  */}

      {(typeof backendData.users === 'undefined') ? (
        <p></p>
      ): (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
      </div>
    </div>
  )
}

export default App