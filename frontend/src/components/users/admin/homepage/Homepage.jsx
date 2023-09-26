import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, ImUsers, BsHousesFill, BiCalendarCheck, MdRateReview } from 'react-icons/all'; // Import icons
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const Homepage = () => {
    const navigate = useNavigate();

    // Function to navigate to different locations
    const navigateTo = (path) => {
        navigate(`/dashboard/${path}`);
    };

    const [num_users, setNum_Users] = useState(0);
    const [num_bookings, setNum_Bookings] = useState(0);
    const [num_listings, setNum_Listings] = useState(0);

    /* Read the data */
    useEffect(() => {
        fetch('https://localhost:8443/api/v1/users') // Replace '/api/users' with the appropriate backend API endpoint to fetch users
            .then((response) => response.json())
            .then((data) => {
                const usersData = data
                setNum_Users(data.length);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to fetch users from the server.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
            
    }, []);

        /* Read the data */
        useEffect(() => {
            fetch('https://localhost:8443/api/v1/bookings') // Replace '/api/users' with the appropriate backend API endpoint to fetch users
                .then((response) => response.json())
                .then((data) => {
                    const bookingsData = data
                    setNum_Bookings(data.length);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to fetch users from the server.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                });
                
        }, []);

                /* Read the data */
                useEffect(() => {
                    fetch('https://localhost:8443/api/v1/cards') // Replace '/api/users' with the appropriate backend API endpoint to fetch users
                        .then((response) => response.json())
                        .then((data) => {
                            const listingsData = data
                            setNum_Listings(data.length);
                        })
                        .catch((error) => {
                            console.error('Error fetching users:', error);
                            Swal.fire({
                                title: 'Error',
                                text: 'Failed to fetch users from the server.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        });
                        
                }, []);


    const adminSidebar = {
        items: [
            { icon: <ImUsers />, title: "Users", description: "Manage Users" },
            { icon: <BsHousesFill />, title: "Listings", description: "Manage Listings" },
            { icon: <BiCalendarCheck />, title: "Bookings", description: "Manage Bookings" },
            { icon: <MdRateReview />, title: "Reviews", description: "Manage Reviews" },
        ],
    };

    return (
        <div>
            <div className="sm:flex sm:justify-center sm:items-center sm:mt-10 ">
                <div className="bg-blue-500 lg:px-10 px-5 ml-2 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div className="text-center ml-10 ">
                        <p className="md:text-2xl text-md">{num_users}</p>
                        <p>Users</p>
                    </div>
                </div>
                <div className="bg-blue-500 lg:px-10 px-5  ml-2 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <div className="text-center ml-10">
                        <p className="md:text-2xl text-md">{num_bookings}</p>
                        <p>Bookings</p>
                    </div>
                </div>
                <div className="bg-blue-500 lg:px-10 px-5 ml-2 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
                    <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <div className="text-center ml-10">
                        <p className="md:text-2xl text-md">{num_listings}</p>
                        <p>Listings</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen'>
                <div className="grid grid-cols-2 grid-cols-1 gap-16 sm:pt-16 ">
                    {adminSidebar.items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigateTo(item.title.toLowerCase())}
                            className="bg-blue-500 lg:px-10 px-5 dark:bg-gray-800 shadow-lg rounded-md flex flex-col items-center justify-center p-10 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
                        >
                            {item.icon}
                            <p className="mt-2 text-center text-md">{item.title}</p>
                            <p className="text-xs">{item.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
