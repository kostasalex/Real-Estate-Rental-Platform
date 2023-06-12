import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, ImUsers, BsHousesFill, BiCalendarCheck, MdRateReview } from 'react-icons/all';
import Sidebar from '/src/components/common/navbars/Sidebar';

const AdminDashboard = () => {
    

    const path = location.pathname;
    const currentTab = path.substring(path.lastIndexOf('/') + 1);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(currentTab.toLowerCase());

    useEffect(() => {
      const path = location.pathname;
      const currentTab = path.substring(path.lastIndexOf('/') + 1);
      setActiveTab(currentTab.toLowerCase());
      console.log(currentTab)
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
    { icon: <FaChartLine />, title: 'dashboard', description: 'Dashboard description' },
    { icon: <ImUsers />, title: 'users', description: 'Users description' },
    { icon: <BsHousesFill />, title: 'listings', description: 'Listings description' },
    { icon: <BiCalendarCheck />, title: 'bookings', description: 'Bookings description' },
    { icon: <MdRateReview />, title: 'reviews', description: 'Reviews description' },
  ];

  return (
      <div className='-mt-4'>
        <Sidebar 
            tabs={tabs}
            activeTab = {activeTab}
            handleTabClick = {handleTabClick}
        />
      </div>

  );
};

export default AdminDashboard;
