import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupPage from './components/Signup'


function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
