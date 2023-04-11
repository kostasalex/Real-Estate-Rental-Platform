import React from 'react';
import { Header, Login, SignUp } from './components'
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App