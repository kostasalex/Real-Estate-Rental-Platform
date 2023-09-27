import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props) {

	const loggedInUserId = localStorage.getItem('loggedInUserId')

	const handleClick = () => {
		localStorage.setItem("cardProps", JSON.stringify(props));
	  
		if (loggedInUserId) {
		  // If user is logged in, send the card ID to backend
		  fetch('https://localhost:8443/updateVisitedListings', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  userId: loggedInUserId,
			  cardId: props.id
			})
		  })
		  .then(response => response.json())
		  .then(data => {
			console.log(data.message); // You can handle the success response here
		  })
		  .catch(error => {
			console.error('Error updating visited listings:', error); // Handle errors here
		  });
		} else {
		  // If user is a guest, store the card ID in local storage
		  const visitedListings = JSON.parse(localStorage.getItem('visitedListings')) || [];
		  if (!visitedListings.includes(props.id)) {// Maybe we can keep dublicates for better recomentation 
			visitedListings.push(props.id);
			localStorage.setItem('visitedListings', JSON.stringify(visitedListings));
		  }
		}
	  
		const newTab = window.open(`/cards/${props.id}`, "_blank");
	  };
	  
	const navigate = useNavigate();
	JSON.parse(localStorage.getItem("cardProps"));
	const isHost = props.hosts_id === loggedInUserId;
	const handleEditListing = () => {
		localStorage.setItem("cardProps", JSON.stringify(props));
		const newTab = window.open(`/newlisting/${props.id}`);
	};

	// State to manage the confirmation dialog
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [listingToDelete, setListingToDelete] = useState(null);

	// Function to handle the delete button click
	const handleDeleteListing = () => {
		// Open the confirmation dialog and store the listing to be deleted
		setIsDeleteDialogOpen(true);
		setListingToDelete(props.id);
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
								window.location.reload();
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
						const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
							method: 'DELETE',
						});

						if (listingResponse.status === 200) {
							// If the listing deletion was successful, call the onDelete callback
							window.location.reload();
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
							window.location.reload();
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
					const listingResponse = await fetch(`https://localhost:8443/api/v1/deleteListing/${listingToDelete}`, {
						method: 'DELETE',
					});

					if (listingResponse.status === 200) {
						// If the listing deletion was successful, call the onDelete callback
						window.location.reload();
					} else {
						// Handle error, show a message, etc.
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

	const cardProps = JSON.parse(localStorage.getItem("cardProps"));
	const maxRating = 100;
	const targetMaxRating = 5;

	const convertedRating = (props.reviewScoresRating / maxRating) * targetMaxRating;

	const roundedRating = Math.round(convertedRating * 10) / 10;

	return (
		<div className="w-[450px] h-[500px] mb-4 cursor-pointer ">
			<section className="flex flex-col items-center bg-white">
				<div className="mt-10 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-8">
					<article className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
						<a className="z-0" target="_blank" onClick={handleClick} >
							<div className="">
								<img src={props.thumbnailUrl} alt="" className="object-fill h-48 w-96" />
							</div>

							<div className="p-4">
								<div className="pb-6">
									<p className="overflow-hidden text-lg hover:text-blue-600 font-medium duration-500 ease-in-out">{props.street}</p>
								</div>

								<ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
									<li className="mr-4 flex items-center text-left">
										<i className="mr-2 text-2xl text-blue-600">
											<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z" /></svg>
										</i>
										<span className="text-sm">{props.roomType}</span>
									</li>

									<li className="mr-4 flex items-center text-left">
										<i className="mr-2 text-2xl text-blue-600">
											<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5zm-4-2h-5V7h5v3zM6 7h5v3H6V7zm-2 5h16v3H4v-3z" /></svg>
										</i>
										<span className="text-sm">{props.beds} Bed(s)</span>
									</li>
								</ul>
								<ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
									<li className="text-left">
										<span className="text-sm text-gray-400">Price</span>
										<p className="m-0 text-base font-medium">{props.price}</p>
									</li>

									<li className="text-left">
										<span className="text-sm text-gray-400">Rating</span>
										<ul className="m-0 flex items-center p-0 font-medium">
											<li className="inline text-yellow-500">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											</li>
											<li className="ml-2 inline text-base"><p>{roundedRating}({props.numberOfReviews} Reviews)</p></li>
										</ul>
									</li>
								</ul>
							</div>
						</a>
					</article>
				</div>
				{isHost && (
					<div className="flex items-center text-left">
						{/* Wrap the "Edit" button in a container */}
						<div onClick={(e) => handleEditListing(props.id, e)}>
							<button
								type="submit"
								className="px-2.5 py-1.5 rounded-md text-white text-sm bg-blue1 z-10"
							>
								Edit
							</button>
						</div>

						<div className="px-2" onClick={(e) => handleDeleteListing(props.id, e)}>
							<button
								type="submit"
								className="px-2.5 py-1.5 rounded-md text-white text-sm bg-red-500 z-10"
							>
								Delete
							</button>
						</div>
					</div>
				)}
				{/* Confirmation dialog */}
				{isDeleteDialogOpen && (
					<div className="fixed inset-0 flex items-center justify-center z-50">
						<div className="bg-white p-4 rounded-lg shadow-md">
							<p className="text-gray-800 mb-4">Are you sure you want to delete this listing?</p>
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
			</section >

		</div >

	);
}

export default Card;
