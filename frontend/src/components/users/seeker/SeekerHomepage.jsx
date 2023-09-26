import React, { useState, useEffect, useRef } from 'react';
import Cards from '../Cards';
import { Recommendation } from '/src/components';
import Card from '/src/components/common/homepage/Card';
const SeekerHomepage = (listings) => {
    const [suggested, setSuggested] = React.useState([]);
    const [recent, setRecent] = React.useState([]);
    const NUM_RESULTS = 13;
    const NUM_RESULTS2 = 10;


    const MAX_RESULTS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [myListings, setMyListings] = useState([]); // Renamed the state variable
    const [filteredListings, setFilteredListings] = useState([]);

    useEffect(() => {
        // Set the local state variable with the prop value when it's available
        if (listings.length > 0) {
            setMyListings(listings);
            setCurrentPage(1);
        } else {
            // If the prop is not available, fetch data
            fetch("https://localhost:8443/cards")
                .then((response) => response.json())
                .then((data) => {
                    setMyListings(data);
                    setCurrentPage(1);
                })
                .catch((error) => console.error(error));
        }
    }, [listings]);

    useEffect(() => {
        const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
        const end = start + MAX_RESULTS_PER_PAGE;
        const listingsToDisplay = myListings.slice(start, end);
        setFilteredListings(listingsToDisplay);
    }, [currentPage, myListings]);

    const totalPages = () => {
        return myListings ? Math.ceil(myListings.length / MAX_RESULTS_PER_PAGE) : 1;
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
    React.useEffect(() => {
        fetch("https://localhost:8443/cards")
            .then((response) => response.json())
            .then((data) => {
                setSuggested(data.slice(10, NUM_RESULTS));
                setRecent(data.slice(7, NUM_RESULTS2));
            })
            .catch((error) => console.error(error));
    }, []);


    return (
        <div className='flex flex-col space-y-16'>
            <div className='m-t-2 '>
                <Recommendation />
            </div>
            <div className='m-t-2 '>
                <div className='justify-center text-gray-900 text-3xl flex pb-2'> Suggested Listings  </div>
                <div className='justify-center flex'> <Cards listings={suggested} />  </div>

            </div>
            <div className='m-t-2 '>
                <div className='justify-center text-gray-900 text-3xl flex pb-2'> Recent Listings  </div>
                <div className='justify-center flex'> <Cards listings={recent} />  </div>
            </div>

            <div className="flex flex-col justify-center">
            <div className='justify-center text-gray-900 text-3xl flex pb-2'> All Listings  </div>
                <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                    <span className="text-xs text-gray-600 sm:text-sm">
                        Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(myListings.length, currentPage * MAX_RESULTS_PER_PAGE)} of {myListings.length} Entries
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
                        Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(myListings.length, currentPage * MAX_RESULTS_PER_PAGE)} of {myListings.length} Entries
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
    )
}

export default SeekerHomepage