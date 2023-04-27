import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const filters = {
    location: queryParams.get('location') || '',
    homeType: queryParams.get('homeType') || '',
    arrive: queryParams.get('arrive') || '',
    leave: queryParams.get('leave') || '',
    guests: queryParams.get('guests') || '',
  };

  const selectedFilters = Object.values(filters).filter((filter) => filter !== '');

  return (
    <div className='mt-48 flex flex-col justify-center  items-center text-3xl text-blue1'>
      <div>Results for Selected Filters:</div>
      <div>
      {selectedFilters.length > 0 ? (
        <ul>
          {selectedFilters.map((filter, index) => (
            <li key={index}>{filter}</li>
          ))}
        </ul>
      ) : (
        <p>No filters selected</p>
      )}
      </div>

    </div>
  );
};

export default Results;
