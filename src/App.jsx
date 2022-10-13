import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Csvfilereader from './Csvfilereader'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Csvfilereader />
   </>
  )
}

export default App
