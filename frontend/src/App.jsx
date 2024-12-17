// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'

function App() {
  return (
    <Routes>

      <Route path="/" index element={<Login />} />

    </Routes>
  )
}

export default App
