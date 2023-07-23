import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ReviewsTable from './ReviewsTable';

const Reviews = () => {
  const NUM_RESULTS = 30;
  const MAX_RESULTS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/reviews')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.slice(0, NUM_RESULTS));
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * MAX_RESULTS_PER_PAGE;
    const end = start + MAX_RESULTS_PER_PAGE;
    setFilteredReviews(reviews.slice(start, end));
  }, [currentPage, reviews]);

  const totalPages = () => {
    return reviews ? Math.ceil(reviews.length / MAX_RESULTS_PER_PAGE) : 1;
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
    const csv = Papa.unparse(reviews);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reviews.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const json = JSON.stringify(reviews, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reviews.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const iconStyle = 'h-10 w-10 rounded-full object-cover';

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Reviews</h2>
          <span className="text-sm text-gray-500">View currently booked reviews</span>
        </div>
        <div className="ml-10 space-x-8 flex flex-rows lg:ml-40">
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
          <ReviewsTable reviews={filteredReviews} iconStyle={iconStyle} />
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            Showing {(currentPage - 1) * MAX_RESULTS_PER_PAGE + 1} to {Math.min(reviews.length, currentPage * MAX_RESULTS_PER_PAGE)} of {NUM_RESULTS} Entries
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

export default Reviews;
