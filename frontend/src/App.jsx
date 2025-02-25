import React from 'react';
import { useState, useEffect } from 'react';
import { Header, EditProfile, SeekerHomepage, DashboardToggle, HostHomepage, Footer, NotFound, NewListing, Messages, Login, SignUp, Cards, Results, CardDetails, AdminHomepage, AdminDashboard, AdminBookings, AdminListings, AdminReviews, AdminUsers } from './components'
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [adminDashboardToggle, setAdminDashboardToggle] = useState(false)

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
    localStorage.getItem('loggedInUserEmail') || null
  );

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || {}
  );



  const handleUserInfo = (id, firstName, email, userType) => {
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

    localStorage.setItem('loggedInUserId', id);
    localStorage.setItem('loggedInFirstName', firstName);
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserType', userType);
    handleUserInfo(id, firstName, email, userType);
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

  const handleDashboard = () => {
    navigate('/');
  }

  const handleEditProfile = () => {
    navigate('/editprofile');
  }

  React.useEffect(() => {
    setAdminDashboardToggle(location.pathname.startsWith('/dashboard'));
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App mt-20 flex flex-grow pb-40 flex-col min-h-screen">
        {loggedInUserType === 'Admin' &&
          (adminDashboardToggle ? <AdminDashboard /> : <DashboardToggle handleDashboard={handleDashboard} />
          )}
        <Header
          loggedInUserType={loggedInUserType}
          handleUserType={handleUserType}
          loggedInUserId={loggedInUserId}
          handleLogout={handleLogout}
          handleMessages={handleMessages}
          handleDashboard={handleDashboard}
          handleEditProfile={handleEditProfile}
          
        />
        <div className="flex-grow">
          <Routes>
            {loggedInUserType && (
              <Route path="/messages" element={<Messages loggedInUserId={loggedInUserId} loggedInFirstName={loggedInUserFirstName} />} />
            )}
            {loggedInUserType === 'Admin' && (
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            )}
            {loggedInUserType === null && <Route path="/" element={<Cards />} />}
            {loggedInUserType === 'Host' && (
              <>
                <Route path="/" element={<HostHomepage hosts_id={loggedInUserId} />} />
                <Route path="/newlisting" element={<NewListing loggedInUserId={loggedInUserId} />} />
              </>
            )}
            {(loggedInUserType === 'Seeker' || loggedInUserType === 'PendingHost') && (
              <Route path="/" element={<SeekerHomepage />} />
            )}

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
            <Route
              path="/login"
              element={loggedInUserType ? <Navigate to="/" replace /> : <Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={loggedInUserType ? <Navigate to="/" replace /> : <SignUp handleLogin={handleLogin} />}
            />
            <Route
              path="/editprofile" element={!loggedInUserType ? <Navigate to="/" replace /> :<EditProfile handleLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
            <Route path="/results/q?" element={<Results />} />
            <Route path="/cards/:cardId" element={<CardDetails />} />
            <Route path="notfound" element={<NotFound />} />
            <Route
              path="/newlisting/:cardId"
              element={<NewListing loggedInUserId={loggedInUserId} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </LocalizationProvider>

  )
}

export default App