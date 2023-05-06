import React from 'react';
import { useLocation } from 'react-router-dom';

const FiltersSelected = () => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

    const [filters, setFilters] = React.useState({
      location: queryParams.get('location') || '',
      arrive: queryParams.get('arrive') || '',
      leave: queryParams.get('leave') || '',
      guests: queryParams.get('guests') || '',
      maxPrice: queryParams.get('maxPrice') || '',
      roomType: queryParams.get('roomType')?.split(',') || [],
      amenities: queryParams.get('amenities')?.split(',') || [],
    });

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilters = {
      location: queryParams.get('location') || '',
      arrive: queryParams.get('arrive') || '',
      leave: queryParams.get('leave') || '',
      guests: queryParams.get('guests') || '',
      maxPrice: queryParams.get('maxPrice') || '',
      roomType: queryParams.get('roomType')?.split(',') || [],
      amenities: queryParams.get('amenities')?.split(',') || [],
    };
    setFilters(newFilters);
  }, [location.search]);

  const filterList = Object.entries(filters).map(([key, value]) => {
    if (Array.isArray(value)) {
      value = value.join(', ');
    }
    return (
      value && (
        <button
          key={key}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          { `${key} : ${value}`}
        </button>
      )
    );
  });

  return (
    <>
      <h2 className="font-semibold text-sm "></h2>
      {filterList.length > 0 ? (
        <div className="flex flex-wrap">{filterList}</div>
      ) : (
        <p>No filters selected</p>
      )}
    </>
  );
};

export default FiltersSelected;
