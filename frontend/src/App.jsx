import React from 'react';
import { useState, useEffect } from 'react';
import { Header, SeekerHomepage, HostHomepage, NewListing, Messages,  Login, SignUp, Cards, Results, CardDetails, AdminHomepage, AdminDashboard, AdminBookings, AdminListings, AdminReviews, AdminUsers } from './components'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Swal from "sweetalert2";

function App() {

  const navigate = useNavigate();

  const [loggedInUserType, setLoggedInUserType] = useState(
    localStorage.getItem('loggedInUserType') || null
  );

  const [loggedInUserId, setLoggedInUserId] = useState(
    parseInt(localStorage.getItem('loggedInUserId')) || null
  );

  const [loggedInUserFirstName, setLoggedInUserFirstName] = useState(
    localStorage.getItem('loggedInFirstName') || null
  );

  const [loggedInUserEmail, setLoggedInUserEmail] = useState(
    localStorage.getItem('loggedInFirstName') || null
  );

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || {}
  );
   
  

  const handleUserInfo = (id, firstName,email, userType) => {
    setLoggedInUserId(id);
    setLoggedInUserEmail(email);
    setLoggedInUserFirstName(firstName);
    handleUserType(userType);
  };

  const handleUserType = (userType) => {
    localStorage.setItem('loggedInUserType', userType);
    setLoggedInUserType(userType);
  }

  const handleLogin = (userData) => {
    const { id, firstName, userType, email } = userData;
    // Save the user details to local storage
    console.log(id + " - " + firstName + " - " + userType + " - " + email);
    localStorage.setItem('loggedInUserId', id);
    localStorage.setItem('loggedInFirstName', firstName);
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserType', userType);
    handleUserInfo(id, firstName,email, userType );
  };

  const handleLogout = () => {
    navigate('/');
    setLoggedInUserType(null);
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('loggedInFirstName');
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserType');
  };

  
  const handleMessages = () => {
    navigate('/messages');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App mt-20">
      {loggedInUserType === 'Admin' && <AdminDashboard />}
        <Header loggedInUserType={loggedInUserType} handleUserType = {handleUserType} loggedInUserId={loggedInUserId} handleLogout={handleLogout}  handleMessages={handleMessages}/>
        <Routes>
          {loggedInUserType && (
            <Route path = "/messages" element={<Messages loggedInUserId={loggedInUserId} loggedInFirstName = {loggedInUserFirstName} />}/>
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
          {(loggedInUserType === 'Seeker' || loggedInUserType === 'PendingHost') && (

            <Route path="/" element={<SeekerHomepage />} />

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