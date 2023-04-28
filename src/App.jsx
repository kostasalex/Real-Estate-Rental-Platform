import React from 'react';
import { Header, Login, SignUp, Cards, Results, CardDetails } from './components'
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div className="App mt-20">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/results/q?" element={<Results/>} />
        <Route path="/cards/:cardTitle" element={<CardDetails/>} />
      </Routes>
    </div>
  )
}

export default App