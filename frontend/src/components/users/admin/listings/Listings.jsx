import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ListingsTable from './ListingsTable';

const Listings = () => {
	const [numResults, setNumResults] = useState(0);
	const MAX_RESULTS_PER_PAGE = 10;

	const [currentPage, setCurrentPage] = useState(1);
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	useEffect(() => {
		// Fetch listings data
		const fetchListings = async () => {
			const response = await fetch('https://localhost:8443/cards');
			const data = await response.json();
			setNumResults(data.length);
			return data;
		};

		// Fetch users data
		const fetchUsers = async () => {
			const response = await fetch('https://localhost:8443/api/v1/users');
			const data = await response.json();
			return data;
		};

		// Process and set listings
		const processData = async () => {
			try {
				const listingsData = await fetchListings();
				const usersData = await fetchUsers();

				const processedListings = listingsData.map((listing) => {
					// Find the corresponding user for each listing
					const user = usersData.find((u) => u.id === listing.hosts_id);

					return {
						id: listing.id,
						name: listing.name,
						host_location: user ? user.address : 'N/A',
						host_name: user ? user.firstName : 'N/A',
						thumbnail_url: listing.thumbnail_url,
					};
				});

				setListings(processedListings.slice(0, listingsData.length));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		processData();
	}, []);

	useEffect(() => {
		const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
		const end = start + MAX_RESULTS_PER_PAGE;
		setFilteredListings(listings.slice(start, end));
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

	const downloadCSV = () => {
		const csv = Papa.unparse(listings);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'listings.csv');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadJSON = () => {
		const json = JSON.stringify(listings, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'listings.json');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const iconStyle = 'h-10 w-10 rounded-full object-cover';

	const handleDeleteListing = (id) => {
		// Filter out the listing with the provided id from the state
		const updatedListings = listings.filter((listing) => listing.id !== id);

		// Set the updated state
		setListings(updatedListings);
	};

	const smallScreenBreakpoint = 768;
	return (
		<div className="float-right w-3/4 bg-white pr-10">
			<div className={`flex flex-col pb-6 ${screenWidth <= smallScreenBreakpoint ? 'items-center' : ''}`}>
				<div className={`p-2 pb-10 ${screenWidth <= smallScreenBreakpoint ? 'text-center' : 'items-start'}`}>
					<h2 className="font-semibold text-gray-700">Listings</h2>
					<span className="text-sm text-gray-500">View listings being currently booked</span>
				</div>
				<div className={`flex justify-end space-x-4 ${screenWidth <= smallScreenBreakpoint ? '' : ''}`}>
					<button
						className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
						onClick={downloadCSV}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
						</svg>
						CSV
					</button>
					<button
						className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
						onClick={downloadJSON}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
						</svg>
						JSON
					</button>
				</div>
			</div>
			<div className="overflow-y-hidden rounded-lg border">
				<div className="overflow-x-auto">
					<ListingsTable listings={filteredListings} onDelete={handleDeleteListing} />
				</div>
				<div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
					<span className="text-xs text-gray-600 sm:text-sm">
						Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(listings.length, currentPage * MAX_RESULTS_PER_PAGE)} of {numResults} Entries
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

export default Listings;
