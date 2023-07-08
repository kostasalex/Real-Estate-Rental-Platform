import React from 'react';
import { Header, SeekerHomepage, HostHomepage, NewListing, Messages,  Login, SignUp, Cards, Results, CardDetails, AdminHomepage, AdminDashboard, AdminBookings, AdminListings, AdminReviews, AdminUsers } from './components'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

  const navigate = useNavigate();

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
    navigate('/');
    setLoggedInUserType(null);
    localStorage.removeItem('loggedInUserType');
  };

  
  const handleMessages = () => {
    navigate('/messages');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App mt-20">
      {loggedInUserType === 'Admin' && <AdminDashboard />}
        <Header loggedInUserType={loggedInUserType} handleLogout={handleLogout} handleUserType = {handleUserType} handleMessages={handleMessages}/>
        <Routes>
          {loggedInUserType && (
            <Route path = "/messages" element={<Messages/>}/>
          )}
          {loggedInUserType === 'Admin' && (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          )}
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
          {loggedInUserType === 'Admin' && (
            <>
              <Route path="/dashboard" element={<AdminHomepage />} />
              <Route path="/dashboard/bookings" element={<AdminBookings />} />
              <Route path="/dashboard/listings" element={<AdminListings />} />
              <Route path="/dashboard/reviews" element={<AdminReviews />} />
              <Route path="/dashboard/users" element={<AdminUsers />} />
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