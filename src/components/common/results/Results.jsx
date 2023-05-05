import React from 'react';
import Filters from './filters/Filters';
import { useLocation } from 'react-router-dom';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import FiltersSelected from './filters/FiltersSelected';
const Results = () => {
    
  const navigate = useNavigate();    
  
  const [filtersToggle, setFiltersToggle] = React.useState(true);

  const handleFilterToggle = () => {
    setFiltersToggle(!filtersToggle);
};


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const filters = {
    location: queryParams.get('location') || '',
    arrive: queryParams.get('arrive') || '',
    leave: queryParams.get('leave') || '',
    guests: queryParams.get('guests') || '',
  };

  const [filters2, setFilters2] = React.useState({
    maxPrice: queryParams.get('maxPrice') ? queryParams.get('maxPrice')  : 1000,
    roomType: {
      hotel: queryParams.get('roomType')?.includes('hotel') || false,
      apartment: queryParams.get('roomType')?.includes('apartment') || false,
      villa: queryParams.get('roomType')?.includes('villa') || false,
    },
    amenities: {
      wifi: queryParams.get('amenities')?.includes('wifi') || false,
      airConditioning: queryParams.get('amenities')?.includes('airConditioning') || false,
      kitchen: queryParams.get('amenities')?.includes('kitchen') || false,
      tv: queryParams.get('amenities')?.includes('tv') || false,
      parking: queryParams.get('amenities')?.includes('parking') || false,
      elevator: queryParams.get('amenities')?.includes('elevator') || false,
    },
  });

  const handleMaxPriceChange = (event) => {
    const { value } = event.target;
    setFilters2((filters) => ({
      ...filters,
      maxPrice: value,
    }));
  };

  React.useEffect(() => {
    setFilters2({
      maxPrice: queryParams.get('maxPrice') ? queryParams.get('maxPrice')  : 1000,
      roomType: {
        hotel: queryParams.get('roomType')?.includes('hotel') || false,
        apartment: queryParams.get('roomType')?.includes('apartment') || false,
        villa: queryParams.get('roomType')?.includes('villa') || false,
      },
      amenities: {
        wifi: queryParams.get('amenities')?.includes('wifi') || false,
        airConditioning: queryParams.get('amenities')?.includes('airConditioning') || false,
        kitchen: queryParams.get('amenities')?.includes('kitchen') || false,
        tv: queryParams.get('amenities')?.includes('tv') || false,
        parking: queryParams.get('amenities')?.includes('parking') || false,
        elevator: queryParams.get('amenities')?.includes('elevator') || false,
      },
    });
  }, [location.search]);

  const selectedFilters = {
    ...filters,
    roomType: Object.keys(filters2.roomType).filter((option) => filters2.roomType[option]),
    amenities: Object.keys(filters2.amenities).filter((option) => filters2.amenities[option]),
  };

  console.log(selectedFilters)
  const handleOptionSelect = (category, option) => {
      console.log(category)
      setFilters2((filters) => {
          const categoryOptions = { ...filters[category] };
          categoryOptions[option] = !categoryOptions[option];
          return { ...filters, [category]: categoryOptions };
      });
    };

    const showResults = () => {
      const roomTypeFilters = Object.keys(filters2.roomType).filter(key => filters2.roomType[key]).join(',');
      const amenityFilters = Object.keys(filters2.amenities).filter(key => filters2.amenities[key]).join(',');
      const url = `/results/q?location=${filters.location}&arrive=${filters.arrive}&leave=${filters.leave}&guests=${filters.guests}&roomType=${roomTypeFilters}&amenities=${amenityFilters}&maxPrice=${filters2.maxPrice}`;
      navigate(url)
    };

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

  return (
    <div >
      {filtersToggle && <Filters filters = {filters2} handleOptionSelect = {handleOptionSelect} handleMaxPriceChange={handleMaxPriceChange}/>}
      <div className={(!filtersToggle ? "mt-24":"mt-10") + ` flex flex-col justify-center  items-center`}>
      <FiltersSelected/>
      </div>
      <div className='fixed lg:top-24 top-1 left-6 justify-end xl:mr-32'>
            <button 
                className='flex flex-row  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-white duration-300 transform hover:translate-y-2'
                onClick={handleFilterToggle}>
                <div className='mr-2   text-lg'>
                    Filters
                </div>
                <div className=''>
                  {filtersToggle ?  <FaArrowAltCircleUp style={{ fontSize: '20px' }} />
                                :<FaArrowAltCircleDown style={{ fontSize: '20px' }} />}
                </div>
            
            </button>
      </div>
      <div className='flex flex-row border-t-2 border-gray-50 pt-10 justify-center items-center space-x-10 mt-7'>
            <button className='flex flex-row items-center bg-white border-2 border-blue1 rounded-xl px-2 py-1 text-blue1'>
                    <div className='mr-2 text-lg' onClick={clearAll}>
                        Clear All
                    </div>
            </button>
            <button className='flex flex-row items-center bg-blue1 rounded-xl px-2 py-1 text-white'>
                <div className='mr-2 text-lg' onClick={showResults}>
                    Show Results
                </div>
                <BiSearch style={{ fontSize: '20px' }} />
            </button>
      </div>

    </div>
  );
};

export default Results;
