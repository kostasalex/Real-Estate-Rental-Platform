import React from 'react';
import { useLocation } from 'react-router-dom';
import Option from '/src/components/common/buttons/Option';

const FiltersSelected = ({handleOptionSelect}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchBarFilters, setSearchBarFilters] = React.useState({
    location: '',
    arrive: '',
    leave: '',
    guests: '',
  });

  const [filters, setFilters] = React.useState({
    maxPrice: '',
    roomType: [],
    amenities: [],
  });

  React.useEffect(() => {
    const newSearchBarFilters = {
      location: queryParams.get('location') || '',
      arrive: queryParams.get('arrive') || '',
      leave: queryParams.get('leave') || '',
      guests: queryParams.get('guests') || '',
    };
    setSearchBarFilters(newSearchBarFilters);

    const newFilters = {
      maxPrice: queryParams.get('maxPrice') || '',
      roomType: queryParams.get('roomType')?.split(',') || [],
      amenities: queryParams.get('amenities')?.split(',') || [],
    };
    setFilters(newFilters);

  }, [location.search]);


  const basicFilters = Object.entries(searchBarFilters ).map(([key, value]) => {
    return (
      value && (
        <div
          key={key}
          className="inline-block bg-gray-100 rounded-md  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {`${key}: ${value}`}
        </div>
      )
    );
  });


  const secondaryFilters = Object.entries(filters).map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        item && 
        
        <Option 
          onRemove={handleOptionSelect}
          category={key}
          option={item}
          value = {item}
          />

      ));
    } else {
      return (
        value && (
          <Option 
            onRemove={handleOptionSelect}
            category={key}
            option={value}
            value = {`${key}: ${value}`}
            />
        )
      );
    }
  });

  
  return (
    <div className='flex flex-row space-x-10'>
        <div className="flex flex-wrap">{basicFilters}</div>
        <div className="flex flex-wrap">{secondaryFilters}</div>
    </div>
  );
};

export default FiltersSelected;
