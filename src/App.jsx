import React from 'react';
import { Header, SeekerHomepage, HostHomepage, NewListing,  Login, SignUp, Cards, Results, CardDetails } from './components'
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App mt-20">
        <Header loggedInUserType={loggedInUserType} handleLogout={handleLogout} handleUserType = {handleUserType} />
        <Routes>
          {loggedInUserType === null && <Route path="/" element={<Cards/>} />}
          {loggedInUserType === 'Host' && (
            <>
              <Route path="/" element={<HostHomepage />} />
              <Route path="/newlisting" element={<NewListing />} />
            </>
            )
          }
          {loggedInUserType === 'Seeker' && (
            <>
              <Route path="/" element={<SeekerHomepage />} />
            </>
            )
          }
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
          <Route path="/results/q?" element={<Results/>} />
          <Route path="/cards/:cardId" element={<CardDetails/>} />
        </Routes>
      </div>
    </LocalizationProvider>

  )
}

export default App