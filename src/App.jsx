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

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || {}
  );

  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const resetActivityTimer = () => {
      setLastActivity(Date.now());
    };
  
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll'];
  
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetActivityTimer);
    });
  
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetActivityTimer);
      });
    };
  }, []);


  useEffect(() => {
    const logoutTimeout = 10 * 60 * 1000; // 10 minutes timeout in milliseconds
  
    const checkActivity = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastActivity;
  
      if (elapsedTime > logoutTimeout && loggedInUserType !== null) {
        handleLogout();
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out due to inactivity.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    };
  
    const activityCheckInterval = setInterval(checkActivity, 60000); // Check every minute
  
    return () => {
      clearInterval(activityCheckInterval);
    };
  }, [lastActivity, loggedInUserType]);
  

  const handleUserType = (userType) => {
    setLoggedInUserType(userType);
  };

  const handleLogin = (userData) => {
    const { id, firstName, userType, email } = userData;
    // Save the user details to local storage
    console.log(id + " - " + firstName + " - " + userType + " - " + email);
    localStorage.setItem('loggedInUserId', id);
    localStorage.setItem('loggedInUserName', firstName);
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserType', userType);
    handleUserType(userType);
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