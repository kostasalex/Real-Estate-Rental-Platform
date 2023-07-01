import React, { useEffect, useState } from "react";
import Card from "/src/components/common/homepage/Card";

const Cards = ({listings}) => {

    /* Results per page handling */
    const MAX_RESULTS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);


    const nextPageHandle = () => {
        if (currentPage < totalPages()) {
        const startIndex = currentPage * MAX_RESULTS_PER_PAGE;
        const endIndex = startIndex + MAX_RESULTS_PER_PAGE;
        setCurrentPage(currentPage + 1);
        }
    };

    const prevPageHandle = () => {
        if (currentPage > 1) {
        const startIndex = (currentPage - 2) * MAX_RESULTS_PER_PAGE;
        const endIndex = startIndex + MAX_RESULTS_PER_PAGE;
        setCurrentPage(currentPage - 1);

        }
    }

    const totalPages = () => {
        return listings ? Math.ceil(listings.length / MAX_RESULTS_PER_PAGE) : 1;
    };

    return (
        <div className=" flex flex-col   border-t-2 mb-10 ">
            <div className=" mt-2 flex justify-center items-start gap-x-3 mb-12">
                <h2 className="text-lg font-medium text-gray-800 ">
                     
                    <span className="px-3 py-1 text-md text-blue1 bg-text-blue-600 font-semibold rounded-full ">
                        {listings ? listings.length : 0}
                    </span>
                    Listings Found
                </h2>

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
                      className= "cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>

                      <span>
                          Previous
                      </span>
                  </div>)}

                  {totalPages() > currentPage && (<div
                      onClick={() => nextPageHandle()}
                      className= "cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2">
                      <span>
                          Next
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                  </div>)}
              </div>
          </div>)}

            <div className="flex flex-wrap">
                {listings && listings.slice((currentPage - 1)  * MAX_RESULTS_PER_PAGE , MAX_RESULTS_PER_PAGE + ((currentPage-1)  * MAX_RESULTS_PER_PAGE )).map((listing, index) => (
                    <Card key={index} id={listing.cardUid} {...listing} />))}
            </div>
            {totalPages() > 0 && (
        <div className="mt-6 sm:flex sm:items-center sm:justify-between flex-col ">
          <div className="text-sm  mb-5  text-gray-500  mr-2">
              Page <span className="font-medium text-gray-700 ">
                  {currentPage} from  {totalPages()}</span> 
          </div>

              <div className="flex items-center justify-center mt-4 gap-x-4 sm:mt-0">
                  {currentPage > 1 && (<div 
                      onClick={() => prevPageHandle()}
                      className= "cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>

                      <span>
                          Previous
                      </span>
                  </div>)}

                  {totalPages() > currentPage && (<div
                      onClick={() => nextPageHandle()}
                      className= "cursor-pointer bg-cyan1 hover:bg-blue1 hover:text-white flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2">
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