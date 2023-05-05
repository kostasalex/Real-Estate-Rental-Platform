import React from 'react';
import { Header, Login, SignUp, Cards, Results, CardDetails } from './components'
import { Route, Routes } from 'react-router-dom';
function App() {

  const [loggedInUserType, setLoggedInUserType] = React.useState(
    localStorage.getItem('loggedInUserType') || null
  );

  const handleUserType = (userType) => {
    setLoggedInUserType(userType);
  };

  const handleLogin = (userType) => {
    handleUserType(userType);
    localStorage.setItem('loggedInUserType', userType);
  };

  const handleLogout = () => {
    setLoggedInUserType(null);
    localStorage.removeItem('loggedInUserType');
    navigate('/');
  };


  return (
    <div className="App mt-20">
      <Header loggedInUserType={loggedInUserType} handleLogout={handleLogout} handleUserType = {handleUserType} />
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
        <Route path="/results/q?" element={<Results/>} />
        <Route path="/cards/:cardId" element={<CardDetails/>} />
      </Routes>
    </div>
  )
}

export default App