import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChartLine, ImUsers, BsHousesFill, BiCalendarCheck, MdRateReview } from 'react-icons/all';
import Sidebar from '/src/components/common/navbars/Sidebar';
import { adminSidebar } from '/src/assets/constants';

const AdminDashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const currentTab = path.substring(path.lastIndexOf('/') + 1);

  const [activeTab, setActiveTab] = useState(currentTab.toLowerCase());

  useEffect(() => {
    const path = location.pathname;
    const currentTab = path.substring(path.lastIndexOf('/') + 1);
    currentTab ? setActiveTab(currentTab.toLowerCase()) : setActiveTab("dashboard");
  }, [location]);

  const handleTabClick = (title) => {
    setActiveTab(title.toLowerCase());
    if (title === 'dashboard') {
      navigate('/dashboard');
    } else if (title === 'users') {
      navigate('/dashboard/users');
    } else if (title === 'listings') {
      navigate('/dashboard/listings');
    } else if (title === 'bookings') {
      navigate('/dashboard/bookings');
    } else if (title === 'reviews') {
      navigate('/dashboard/reviews');
    }
  };

  const tabs = [
    { icon: <FaChartLine />, title: adminSidebar.title, description: adminSidebar.description },
    { icon: <ImUsers />, title: adminSidebar.users.title, description: adminSidebar.users.description },
    { icon: <BsHousesFill />, title: adminSidebar.listings.title, description: adminSidebar.listings.description },
    { icon: <BiCalendarCheck />, title: adminSidebar.bookings.title, description: adminSidebar.bookings.description },
    { icon: <MdRateReview />, title: adminSidebar.reviews.title, description: adminSidebar.reviews.description },
  ];

  // Add a state to track screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update the screen width state
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add an event listener to update screen width
  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  // Define a breakpoint for small screens (adjust as needed)
  const smallScreenBreakpoint = 768;

  return (
    <div className="-mt-4">
      {/* Conditionally render the div based on screen width */}
      {screenWidth > smallScreenBreakpoint && (
        <div>
          <Sidebar
            tabs={tabs}p
			
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
