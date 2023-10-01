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
		currentTab ? setActiveTab(currentTab.toLowerCase()) : setActiveTab('dashboard');
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

	// Determine whether to apply the w-1/4 class based on screen width
	const sidebarClass = screenWidth > smallScreenBreakpoint ? 'w-1/4' : '';

	return (
		<div className={`bg-gray-200 ${sidebarClass}`}>
			{/* Conditionally render the div based on screen width */}
			{screenWidth > smallScreenBreakpoint ? (
				<div>
					<Sidebar
						tabs={tabs}
						activeTab={activeTab}
						handleTabClick={handleTabClick}
					/>
				</div>
			) : (
				<div className="grid grid-cols-2 gap-2">
					{tabs
						.filter((item) => item.title.toLowerCase() !== 'dashboard') // Filter out the "Dashboard" tab
						.map((item, index) => (
							// Highlight the current button/tab in blue
							<button
								key={index}
								onClick={() => handleTabClick(item.title)}
								className={`${activeTab === item.title.toLowerCase() ? 'bg-blue-500' : 'bg-blue-300'
									} lg:px-5 px-3 dark:bg-gray-800 shadow-lg rounded-md flex flex-col items-center justify-center p-5 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group`}
							>
								{item.icon}
								<p className="mt-2 text-center text-sm">{item.title}</p>
								<p className="text-xs">{item.description}</p>
							</button>
						))
					}
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
