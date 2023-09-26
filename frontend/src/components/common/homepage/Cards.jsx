import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Recommendation } from '/src/components';


const Cards = () => {

	const MAX_RESULTS_PER_PAGE = 10;

	const [currentPage, setCurrentPage] = useState(1);
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);

	useEffect(() => {
		fetch("https://localhost:8443/cards")
			.then((response) => response.json())
			.then((data) => {
				setListings(data);
				// Set the current page to 1 when fetching new data
				setCurrentPage(1);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		// Calculate the start and end indices for the current page
		const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
		const end = start + MAX_RESULTS_PER_PAGE;

		// Slice the listings array to display only the listings for the current page
		const listingsToDisplay = listings.slice(start, end);
		setFilteredListings(listingsToDisplay);
	}, [currentPage, listings]);

	const totalPages = () => {
		return listings ? Math.ceil(listings.length / MAX_RESULTS_PER_PAGE) : 1;
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

	return (
		<div className="flex flex-col justify-center">
			<Recommendation />

			<div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
				<span className="text-xs text-gray-600 sm:text-sm">
					Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(listings.length, currentPage * MAX_RESULTS_PER_PAGE)} of {listings.length} Entries
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

			{/* Listings */}
			<div className="flex flex-wrap">
				{filteredListings.map((listing, index) => (
					<Card
						key={index}
						id={listing.id}
						thumbnailUrl={listing.thumbnail_url}
						mediumUrl={listing.medium_url}
						price={listing.price}
						roomType={listing.roomType}
						beds={listing.beds}
						numberOfReviews={listing.numberOfReviews}
						reviewScoresRating={listing.reviewScoresRating}
						street={listing.street}
						description={listing.description}
						name={listing.name}
						amenities={listing.amenities}
						accommodates={listing.accommodates}
						bathrooms={listing.bathrooms}
						bedrooms={listing.bedrooms}
						bed_type={listing.bed_type}
						longitude={listing.longitude}
						latitude={listing.latitude}
						hosts_id={listing.hosts_id}
						accessing_info={listing.accessing_info}
						rentalRules={listing.rentalRules}
						size={listing.size}
						minimum_nights={listing.minimum_nights}
						price_per_additional_guest={listing.price_per_additional_guest}
					/>
				))}
			</div>
			<div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
				<span className="text-xs text-gray-600 sm:text-sm">
					Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(listings.length, currentPage * MAX_RESULTS_PER_PAGE)} of {listings.length} Entries
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
	);
};

export default Cards;