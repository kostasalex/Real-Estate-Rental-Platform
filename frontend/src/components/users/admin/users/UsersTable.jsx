import React from 'react';
import { useEffect, useState } from 'react';

const UsersTable = ({ users, rowClickHandler, iconStyle, userIcon, onDelete, closeDialogUser }) => {

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);

	const confirmDelete = async (listingId) => {
		try {
			// 1. Send a DELETE request to delete all bookings associated with the listing
			const bookingsResponse = await fetch(`https://localhost:8443/api/v1/deleteBookingByListingId/${listingId}`, {
				method: 'DELETE',
			});

			// Check if the response status is not 404 (Not Found)
			if (bookingsResponse.status !== 404) {
				if (bookingsResponse.status === 200) {
					// If the bookings deletion was successful, proceed to delete associated reviews

					// 2. Send a DELETE request to delete all reviews associated with the listing
					const reviewsResponse = await fetch(`https://localhost:8443/api/v1/deleteReviewByListingId/${listingId}`, {
						method: 'DELETE',
					});

					// Check if the response status is not 404 (Not Found)
					if (reviewsResponse.status !== 404) {
						if (reviewsResponse.status === 200) {
							// If both booking and review deletions were successful, proceed to delete the listing itself

							// 3. Send a DELETE request to your backend API to delete the listing
							const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingId}`, {
								method: 'DELETE',
							});

							if (listingResponse.status === 200) {
								// If the listing deletion was successful, call the onDelete callback
								onDelete(listingId);
							} else {
								// Handle error, show a message, etc.
								console.error('Error deleting listing');
							}
						} else {
							// Handle error, show a message, etc.
							console.error('Error deleting associated reviews');
						}
					} else {
						// No reviews associated with the listing, proceed to delete the listing itself
						// 3. Send a DELETE request to your backend API to delete the listing
						const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingId}`, {
							method: 'DELETE',
						});

						if (listingResponse.status === 200) {
							// If the listing deletion was successful, call the onDelete callback
							onDelete(listingId);
						} else {
							// Handle error, show a message, etc.
							console.error('Error deleting listing');
						}
					}
				} else {
					// Handle error, show a message, etc.
					console.error('Error deleting associated bookings');
				}
			} else {
				// No bookings associated with the listing, proceed to delete reviews and the listing itself
				// 2. Send a DELETE request to delete all reviews associated with the listing
				const reviewsResponse = await fetch(`https://localhost:8443/api/v1/deleteReviewByListingId/${listingId}`, {
					method: 'DELETE',
				});

				// Check if the response status is not 404 (Not Found)
				if (reviewsResponse.status !== 404) {
					if (reviewsResponse.status === 200) {
						// If review deletion was successful, proceed to delete the listing itself

						// 3. Send a DELETE request to your backend API to delete the listing
						const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingId}`, {
							method: 'DELETE',
						});

						if (listingResponse.status === 200) {
							// If the listing deletion was successful, call the onDelete callback
							onDelete(listingId);
						} else {
							// Handle error, show a message, etc.
							console.error('Error deleting listing');
						}
					} else {
						// Handle error, show a message, etc.
						console.error('Error deleting associated reviews');
					}
				} else {
					// No reviews associated with the listing, proceed to delete the listing itself
					// 3. Send a DELETE request to your backend API to delete the listing
					const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingId}`, {
						method: 'DELETE',
					});

					if (listingResponse.status === 200) {
						// If the listing deletion was successful, call the onDelete callback
						onDelete(listingId);
					} else {
						// Handle error, show a message, etc.
						console.error('Error deleting listing');
					}
				}
			}
		} catch (error) {
			console.error('Error deleting:', error);
		}
	};


	// Function to delete listings associated with a user
	const deleteListingsForUser = async () => {
		try {
			// Fetch the user's listings (replace this with your actual API endpoint)
			const response = await fetch(`https://localhost:8443/api/v1/getListingsByUserId/${userToDelete}`);
			if (response.status === 200) {
				const listings = await response.json();
				// Delete each listing by calling confirmDelete for the listing's ID
				for (const listing of listings) {
					await confirmDelete(listing.id); // Call confirmDelete for each listing
				}
				// After deleting listings, delete the user
				const deleteUserResponse = await fetch(`https://localhost:8443/api/v1/deleteUserByUserId/${userToDelete}`, {
					method: 'DELETE',
				});
				if (deleteUserResponse.status === 200) {
					// If the user deletion was successful, call the onDelete callback
					onDelete(userToDelete);
				} else {
					// Handle error, show a message, etc.
					console.error('Error deleting user');
				}
			} else {
				console.error(`Error fetching listings for user ${userToDelete}`);
			}
		} catch (error) {
			console.error('Error deleting listings for user:', error);
		} finally {
			// Close the confirmation dialog
			setIsDeleteDialogOpen(false);
			setUserToDelete(null);
			closeDialogUser();
		}
	};

	const handleDeleteUser = (id) => {
		// Open the confirmation dialog and store the user to be deleted
		setIsDeleteDialogOpen(true);
		setUserToDelete(id);
	};




	// Function to close the delete confirmation dialog
	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		setUserToDelete(null);
	};



	return (
		<div>
			<table className="min-w-full">
				<thead>
					<tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
						<th className="px-5 py-3">ID</th>
						<th className="px-5 py-3">Photo</th>
						<th className="px-5 py-3">Name</th>
						<th className="px-5 py-3">Email</th>
						<th className="px-5 py-3">Location</th>
						<th className="px-5 py-3">Host Application</th>
						<th className="px-5 py-3 actions-column">Delete</th>

					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr className="hover:bg-blue0 shadow-md cursor-pointer" key={user.id} onClick={() => rowClickHandler(user)}>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="text-sm leading-5 font-medium text-gray-900">{user.id}</div>
							</td>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<img
											className={iconStyle}
											src={user.image_url ? user.image_url : userIcon}
											alt="User"
											onError={(e) => {
												e.target.src = userIcon;
												e.target.alt = 'User Icon';
											}}
										/>
									</div>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="text-sm leading-5 font-medium text-gray-900">
									{user.firstName} {user.lastName}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="text-sm leading-5 font-medium text-gray-900">{user.email}</div>
							</td>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="text-sm leading-5 font-medium text-gray-900">{user.address}</div>
							</td>
							<td className="px-6 py-4 whitespace-no-wrap">
								<div className="text-sm leading-5 font-medium justify-center flex text-gray-900">
									{user.hostApplication === '1' && 'Pending'}
									{user.hostApplication === '0' && 'No'}
									{user.hostApplication === '2' && 'Approved'}
								</div>
							</td>
							<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
								<button
									className="text-white hover:text-gray-100 bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
									onClick={() => handleDeleteUser(user.id)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>

							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Confirmation dialog */}
			{isDeleteDialogOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg shadow-md">
						<p className="text-gray-800 mb-4">Are you sure you want to delete this User?</p>
						<div className="flex justify-end">
							<button
								className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								onClick={deleteListingsForUser}
							>
								Yes
							</button>
							<button
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								onClick={closeDeleteDialog}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};


export default UsersTable;
