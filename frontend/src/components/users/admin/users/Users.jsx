import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UserDetails from './UserDetails';
import UsersTable from './UsersTable';
import userIcon from '/src/assets/user-icon.png';
import Papa from 'papaparse';

const Users = () => {
	const MAX_RESULTS_PER_PAGE = 10;

	const [showAll, setShowAll] = useState(true);
	const [showPending, setShowPending] = useState(false);
	const [showApproved, setShowApproved] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isOpenUser, setIsOpenUser] = useState(false);
	const [allFilteredUsers, setAllFilteredUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [num_results, setNum_Results] = useState(0);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	/* Read the data */
	useEffect(() => {
		fetch('https://localhost:8443/users')
			.then((response) => response.json())
			.then((data) => {
				const usersData = data
				setUsers(usersData);
				setNum_Results(data.length);
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


	// Function to update the screen width state
	const updateScreenWidth = () => {
		setScreenWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', updateScreenWidth);
		return () => {
			window.removeEventListener('resize', updateScreenWidth);
		};
	}, []);


	const smallScreenBreakpoint = 768;
	/** Users details **/
	const openDialogUser = (user) => {
		setSelectedUser(user);
		setIsOpenUser(true);
	};

	const closeDialogUser = () => {
		setIsOpenUser(false);
	};
	/*************************** */

	/* User Filters */
	const showAllUsers = () => {
		setShowAll(true);
		setShowPending(false);
		setShowApproved(false);
	};

	const showPendingUsers = () => {
		setShowAll(false);
		setShowPending(true);
		setShowApproved(false);
	};

	const showApprovedUsers = () => {
		setShowAll(false);
		setShowPending(false);
		setShowApproved(true);
	};
	/******************************/

	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
	};

	/* Handle filtered users */
	useEffect(() => {
		let filtered = users;
		if (showPending) {
			filtered = users.filter(user => user.hostApplication === '1');
		} else if (showApproved) {
			filtered = users.filter(user => user.hostApplication === '2');
		}
		setAllFilteredUsers(filtered);
		setNum_Results(filtered.length);
	}, [users, showAll, showPending, showApproved]);


	/* handle pages */
	useEffect(() => {
		const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
		const end = start + MAX_RESULTS_PER_PAGE;
		setFilteredUsers(allFilteredUsers.slice(start, end));
	}, [currentPage, allFilteredUsers]);

	const totalPages = () => {
		return users ? Math.ceil(users.length / MAX_RESULTS_PER_PAGE) : 1;
	};

	const nextPageHandle = () => {
		if (currentPage < totalPages()) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const prevPageHandle = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};
	/******************************************************* */

	/** Handle download data  **/
	const downloadCSV = () => {
		const csv = Papa.unparse(allFilteredUsers);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'users.csv');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadJSON = () => {
		const json = JSON.stringify(allFilteredUsers, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'users.json');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	/************************************************ */

	const approveHostApplication = async (name, id) => {
		try {
			const response = await fetch("https://localhost:8443/approve-application", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: id }),
			});

			if (response.ok) {
				Swal.fire({
					title: `${name} application successfully approved!`,
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					handleUserType('Host');
				});
			} else {
				Swal.fire({
					title: "Error",
					text: "Failed to approving application",
					icon: "error",
					confirmButtonText: "OK",
				});

			}
		} catch (error) {
			console.error("Error:", error);
			Swal.fire({
				title: "Error",
				text: "Failed to approving application",
				icon: "error",
				confirmButtonText: "OK",
			});
		}

		setIsOpenUser(false);

		fetch('https://localhost:8443/users')
			.then((response) => response.json())
			.then((data) => {
				const usersData = data;
				setUsers(usersData);
				setNum_Results(data.length);
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
	};

	const iconStyle = 'h-10 w-10 rounded-full object-cover';

	const handleDeleteUser = (id) => {
		// Filter out the listing with the provided id from the state
		const updatedUsers = users.filter((user) => user.id !== id);

		// Set the updated state
		setUsers(updatedUsers);
	};

	return (
		<div className="float-right w-3/4 bg-white pr-10">
			<div className={`flex flex-col pb-6 ${screenWidth <= smallScreenBreakpoint ? 'items-center' : ''}`}>
				<div className={`p-2 pb-10 ${screenWidth <= smallScreenBreakpoint ? 'text-center' : 'items-start'}`}>
					<h2 className="font-semibold text-gray-700">User Accounts</h2>
					<span className="text-sm text-gray-500">View accounts of registered users and approve applications</span>
				</div>
				<div className={`flex ${screenWidth <= smallScreenBreakpoint ? 'flex-col' : 'justify-between'}`}>
					<div className={`flex space-x-2 ml-2 bg-gray-200 rounded-full ${screenWidth <= smallScreenBreakpoint ? 'mb-2' : ''}`}>
						<button
							onClick={showAllUsers}
							className={`px-4 py-2 rounded-2xl ${showAll ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
						>
							All
						</button>
						<button
							onClick={showPendingUsers}
							className={`px-4 py-2 rounded-2xl ${showPending ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
						>
							Pending
						</button>
						<button
							onClick={showApprovedUsers}
							className={`px-4 py-2 rounded-2xl ${showApproved ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
						>
							Approved
						</button>
					</div>
					<div className={`flex justify-end space-x-4 ${screenWidth <= smallScreenBreakpoint ? '' : ''}`}>
						<button
							className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
							onClick={downloadCSV}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-4 w-4"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
							</svg>
							CSV
						</button>
						<button
							className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
							onClick={downloadJSON}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-4 w-4"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
							</svg>
							JSON
						</button>
					</div>
				</div>
			</div>
			<div className="overflow-y-hidden rounded-lg border">
				<div className="overflow-x-auto">
					<UsersTable
						users={filteredUsers}
						rowClickHandler={openDialogUser}
						iconStyle={iconStyle}
						userIcon={userIcon}
						onDelete={handleDeleteUser}
						closeDialogUser={closeDialogUser}
					/>
					{isOpenUser && (
						<UserDetails
							user={selectedUser}
							closeDialogUser={closeDialogUser}
							approveHandle={approveHostApplication}
							iconStyle={iconStyle}
							userIcon={userIcon}
						/>
					)}

				</div>
				<div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
					<span className="text-xs text-gray-600 sm:text-sm">
						Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(users.length, currentPage * MAX_RESULTS_PER_PAGE)} of {num_results} Entries
					</span>
					<div className="mt-2 inline-flex sm:mt-0">
						{currentPage > 1 && (
							<button
								className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-blue0"
								onClick={prevPageHandle}
							>
								Prev
							</button>
						)}
						{totalPages() > currentPage && (
							<button
								onClick={nextPageHandle}
								className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-blue0"
							>
								Next
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Users;
