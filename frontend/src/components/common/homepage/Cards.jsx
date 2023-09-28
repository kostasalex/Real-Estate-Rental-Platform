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
	console.log(listings)
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

			{totalPages() > 0 && (
				<div className="mt-6 sm:flex flex-col sm:items-center sm:justify-between ">
					<div className="text-sm text-gray-500 mb-5 mr-2">
						Page <span className="font-medium text-gray-700 ">
							{currentPage} from {totalPages()}</span>
					</div>
					<div className="flex justify-center items-center mt-4 gap-x-4 sm:mt-0">
						{currentPage > 1 && (<div
							onClick={() => prevPageHandle()}
							className="cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 ">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>

							<span>
								Previous
							</span>
						</div>)}

						{totalPages() > currentPage && (<div
							onClick={() => nextPageHandle()}
							className="cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2">
							<span>
								Next
							</span>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</div>)}
					</div>
				</div>)}

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
			{totalPages() > 0 && (
				<div className="mt-6 sm:flex flex-col sm:items-center sm:justify-between ">
					<div className="text-sm text-gray-500 mb-5 mr-2">
						Page <span className="font-medium text-gray-700 ">
							{currentPage} from {totalPages()}</span>
					</div>
					<div className="flex justify-center items-center mt-4 gap-x-4 sm:mt-0">
						{currentPage > 1 && (<div
							onClick={() => prevPageHandle()}
							className="cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 ">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>

							<span>
								Previous
							</span>
						</div>)}

						{totalPages() > currentPage && (<div
							onClick={() => nextPageHandle()}
							className="cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2">
							<span>
								Next
							</span>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</div>)}
					</div>
				</div>)}
		</div>
	);
};

export default Cards;