import React from 'react';
import Filters from './filters/Filters';
import { useLocation } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import FiltersSelected from './filters/FiltersSelected';
import Cards from './Cards';
import Papa from "papaparse";
import ScrollToTopButton from '../scrollToTopButton/ScrollToTopButton';
import FiltersToggle from '/src/components/common/buttons/FiletersToggle';

const Results = () => {

  const NUM_RESULTS = 30;

  const navigate = useNavigate();    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [hasFilters, setHasFilters] = React.useState(false);

  const [listings, setListings] = React.useState([]);
  
  /* Open/close filter section */
  const [filtersToggle, setFiltersToggle] = React.useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleFilterToggle = () => {
    setFiltersToggle(!filtersToggle);
    scrollToTop()
  };


  /* Set searchbar filters (header) from URL parameter q? */
  const searchBarFilters = {
    location: queryParams.get('location') || '',
    arrive: queryParams.get('arrive') || '',
    leave: queryParams.get('leave') || '',
    guests: queryParams.get('guests') || '',
  };

  /* Get filters from url if there was a previous search, or initialize them  */
  const [filters, setFilters] = React.useState({
    maxPrice: queryParams.get('maxPrice') ? queryParams.get('maxPrice')  : "",
    roomType: {
      entire_home: queryParams.get('roomType')?.includes('entire_home') || false,
      private_room: queryParams.get('roomType')?.includes('private_room') || false,
      shared_room: queryParams.get('roomType')?.includes('shared_room') || false,
    },
    amenities: {
      wifi: queryParams.get('amenities')?.includes('wifi') || false,
      airConditioning: queryParams.get('amenities')?.includes('airConditioning') || false,
      kitchen: queryParams.get('amenities')?.includes('kitchen') || false,
      tv: queryParams.get('amenities')?.includes('tv') || false,
      parking: queryParams.get('amenities')?.includes('parking') || false,
      elevator: queryParams.get('amenities')?.includes('elevator') || false,
      pool: queryParams.get('amenities')?.includes('pool') || false,
    },
  });


  const searchListings = async () => {
    const allFilters = JSON.stringify({ ...searchBarFilters, ...filters });
    //console.log(allFilters);
    try {
      const response = await fetch('https://localhost:8443/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: allFilters,
      });
  
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setListings(data);
      } else {
        throw new Error('Failed to retrieve search results');
      }
    } catch (error) {
      console.error(error);
    }
  };
  /* Set the filter state based on the search parameters when the URL changes */
  React.useEffect(() => {
    setFilters({
      maxPrice: queryParams.get('maxPrice') ? queryParams.get('maxPrice')  : "",
      roomType: {
        entire_home: queryParams.get('roomType')?.includes('entire_home') || false,
        private_room: queryParams.get('roomType')?.includes('private_room') || false,
        shared_room: queryParams.get('roomType')?.includes('shared_room') || false,
      },
      amenities: {
        wifi: queryParams.get('amenities')?.includes('wifi') || false,
        airConditioning: queryParams.get('amenities')?.includes('airConditioning') || false,
        kitchen: queryParams.get('amenities')?.includes('kitchen') || false,
        tv: queryParams.get('amenities')?.includes('tv') || false,
        parking: queryParams.get('amenities')?.includes('parking') || false,
        elevator: queryParams.get('amenities')?.includes('elevator') || false,
        pool: queryParams.get('amenities')?.includes('pool') || false,
      },
    });
    searchListings()
  }, [location.search]);


  /* Update URL with new filter values when filters change */
  const updateFilterURL = () => {
    const roomTypeFilters = Object.keys(filters.roomType).filter(key => filters.roomType[key]).join(',');
    const amenityFilters = Object.keys(filters.amenities).filter(key => filters.amenities[key]).join(',');
    let url = '/results/q?';
  
    if (searchBarFilters.location !== '') url += `&location=${searchBarFilters.location}`;
    if (searchBarFilters.arrive && searchBarFilters.leave){
      url += `&arrive=${searchBarFilters.arrive}`;
      url += `&leave=${searchBarFilters.leave}`;
    } 
    if (searchBarFilters.guests !== '') url += `&guests=${searchBarFilters.guests}`;
    if (filters.maxPrice !== '' && filters.maxPrice > 0) url += `&maxPrice=${filters.maxPrice}`;
    if (roomTypeFilters !== '') url += `&roomType=${roomTypeFilters}`;
    if (amenityFilters !== '') url += `&amenities=${amenityFilters}`;

    hasOptions();
    navigate(url);
  };  
  
  React.useEffect(() => {
   // console.log("Updating filter URL")
    updateFilterURL()
  }, [filters]);


  /*  Change filter handlers */
  const handleMaxPriceChange = (value) => {
    setFilters((filters) => ({
      ...filters,
      maxPrice: value,
    }));
  };

  const handleOptionSelect = (category, option) => {
      if (category === 'maxPrice') {
        setFilters((filters) => ({
          ...filters,
          maxPrice: ""
        }));
      } else {
        setFilters((filters) => {
          const categoryOptions = { ...filters[category] };
          categoryOptions[option] = !categoryOptions[option];
          return { ...filters, [category]: categoryOptions };
        });
      }
    };


  /* Remove all filters (except searchbar's) */
  const clearAll = () => {
    const queryParams = new URLSearchParams(location.search);
    const amenities = queryParams.get('amenities');
    const maxPrice = queryParams.get('maxPrice');
    const roomType = queryParams.get('roomType');
  
    if (amenities || maxPrice || roomType) {
      queryParams.delete('amenities');
      queryParams.delete('maxPrice');
      queryParams.delete('roomType');
      const newUrl = `${location.pathname}?${queryParams.toString()}`;
      navigate(newUrl);
    }
  }

  /* Check if there is at least one filter */
  const hasOptions = () => {
    const queryParams = new URLSearchParams(location.search);
    const amenities = queryParams.get('amenities');
    const maxPrice = queryParams.get('maxPrice');
    const roomType = queryParams.get('roomType');
    
    setHasFilters(amenities || maxPrice || roomType);
  }
  const renamedListingsArray = listings.map(listing => ({
    ...listing,
    mediumUrl: listing.medium_url,
    thumbnailUrl: listing.thumbnail_url
    // Optionally you can delete the old keys as well, but you'd need to handle that differently
}));

  return (
    <div >
      <ScrollToTopButton/>
      {filtersToggle && <Filters filters = {filters} handleOptionSelect = {handleOptionSelect} handleMaxPriceChange={handleMaxPriceChange}/>}
      <div className={(!filtersToggle ? "mt-24":"mt-10") + ` lg:ml-36 flex flex-row justify-start  items-center`}>
        <FiltersSelected handleOptionSelect = {handleOptionSelect}/>

      </div>
        {hasFilters  && <div className='flex flex-row  ml-10  border-gray-50 justify-center items-center space-x-10 '>
            <button className='flex flex-row items-center bg-white border-blue1 rounded-xl px-2 py-1 hover:opacity-50 text-blue1'>
                    <div className='mr-2 text-md underline' onClick={clearAll}>
                        Clear all
                    </div>
            </button>
        </div>}
      <div className='fixed  top-36 left-1  justify-end xl:mr-32'>
        <FiltersToggle filtersToggle = {filtersToggle} handleFilterToggle = {handleFilterToggle}/>
      </div>
      <div className='mt-2 justify-center flex text-3xl'>
        <Cards listings={renamedListingsArray} />
      </div>

    </div>
  );
};

export default Results;
