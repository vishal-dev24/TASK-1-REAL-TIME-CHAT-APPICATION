import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import Home from './Components/Home.jsx'  // Added Home page import

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />  // Added Home route
            </Routes>
        </Router>
    )
}

export default App