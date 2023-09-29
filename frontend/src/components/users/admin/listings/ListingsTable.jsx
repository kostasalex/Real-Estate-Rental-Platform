import React from 'react';
import { useEffect, useState } from 'react';


const ListingsTable = ({ listings, iconStyle, onDelete }) => {
	// State to manage the confirmation dialog
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [listingToDelete, setListingToDelete] = useState(null);

	// Function to handle the delete button click
	const handleDeleteListing = (id) => {
		// Open the confirmation dialog and store the listing to be deleted
		setIsDeleteDialogOpen(true);
		setListingToDelete(id);
	};

	const confirmDelete = async () => {
		try {
			// 1. Send a DELETE request to delete all bookings associated with the listing
			const bookingsResponse = await fetch(`https://localhost:8443/api/v1/deleteBookingByListingId/${listingToDelete}`, {
				method: 'DELETE',
			});

			// Check if the response status is not 500 (Not Found)
			if (bookingsResponse.status !== 500) {
				if (bookingsResponse.status === 200) {
					// If the bookings deletion was successful, proceed to delete associated reviews

					// 2. Send a DELETE request to delete all reviews associated with the listing
					const reviewsResponse = await fetch(`https://localhost:8443/api/v1/deleteReviewByListingId/${listingToDelete}`, {
						method: 'DELETE',
					});

					// Check if the response status is not 500 (Not Found)
					if (reviewsResponse.status !== 500) {
						if (reviewsResponse.status === 200) {
							// If both booking and review deletions were successful, proceed to delete the listing itself

							// 3. Send a DELETE request to your backend API to delete the listing
							const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
								method: 'DELETE',
							});

							if (listingResponse.status === 200) {
								// If the listing deletion was successful, call the onDelete callback
								onDelete(listingToDelete);
							} else {
								console.error('Error deleting listing');
							}
						} else {
							console.error('Error deleting associated reviews');
						}
					} else {
						// No reviews associated with the listing, proceed to delete the listing itself
						// 3. Send a DELETE request to your backend API to delete the listing
						const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
							method: 'DELETE',
						});

						if (listingResponse.status === 200) {
							// If the listing deletion was successful, call the onDelete callback
							onDelete(listingToDelete);
						} else {
							console.error('Error deleting listing');
						}
					}
				} else {
					console.error('Error deleting associated bookings');
				}
			} else {
				// No bookings associated with the listing, proceed to delete reviews and the listing itself
				// 2. Send a DELETE request to delete all reviews associated with the listing
				const reviewsResponse = await fetch(`https://localhost:8443/api/v1/deleteReviewByListingId/${listingToDelete}`, {
					method: 'DELETE',
				});

				// Check if the response status is not 500 (Not Found)
				if (reviewsResponse.status !== 500) {
					if (reviewsResponse.status === 200) {
						// If review deletion was successful, proceed to delete the listing itself

						// 3. Send a DELETE request to your backend API to delete the listing
						const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
							method: 'DELETE',
						});

						if (listingResponse.status === 200) {
							// If the listing deletion was successful, call the onDelete callback
							onDelete(listingToDelete);
						} else {
							console.error('Error deleting listing');
						}
					} else {
						console.error('Error deleting associated reviews');
					}
				} else {
					// No reviews associated with the listing, proceed to delete the listing itself
					// 3. Send a DELETE request to your backend API to delete the listing
					const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
						method: 'DELETE',
					});

					if (listingResponse.status === 200) {
						// If the listing deletion was successful, call the onDelete callback
						onDelete(listingToDelete);
					} else {
						console.error('Error deleting listing');
					}
				}
			}
		} catch (error) {
			console.error('Error deleting:', error);
		} finally {
			// Close the confirmation dialog
			setIsDeleteDialogOpen(false);
			setListingToDelete(null);
		}
	};




	// Function to close the confirmation dialog
	const closeDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		setListingToDelete(null);
	};

	return (
		<div>
			<table className="w-full">
				<thead>
					<tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white border-2 border-blue-600">
						<th className="px-5 py-3">ID</th>
						<th className="px-5 py-3">Name</th>
						<th className="px-5 py-3">Location</th>
						<th className="px-5 py-3">Host Name</th>
						<th className="px-5 py-3">Delete</th> {/* New column for actions */}
					</tr>
				</thead>
				<tbody className="text-gray-500">
					{listings &&
						listings.map((listing) => (
							<tr key={listing.id} className="">
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<p className="whitespace-no-wrap">{listing.id}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<div className="flex items-center">
										<div className="h-10 w-10 flex-shrink-0">
											<img className={iconStyle} src={listing.thumbnail_url} alt="Apartment image" />
										</div>
										<div className="ml-3">
											<p className="whitespace-no-wrap">{listing.name}</p>
										</div>
									</div>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<p className="whitespace-no-wrap">{listing.host_location}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<p className="whitespace-no-wrap">{listing.host_name}</p>
								</td>
								<td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
									<button
										className="text-white hover:text-gray-100 bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
										onClick={() => handleDeleteListing(listing.id)}
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
						<p className="text-gray-800 mb-4">Are you sure you want to delete this Listing?</p>
						<div className="flex justify-end">
							<button
								className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								onClick={confirmDelete}
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

export default ListingsTable;
