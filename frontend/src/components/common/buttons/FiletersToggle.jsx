import React from 'react'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa';

const FiltersToggle = ({filtersToggle, handleFilterToggle}) => {

    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset < 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
  

    return (
        <button 
            className={'flex flex-row  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-blue1 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-white duration-300 transform hover:translate-y-2 ' + (isVisible ? 'visible' : 'invisible')}
            onClick={handleFilterToggle}>
            <div className='mr-2   text-lg'>
                Filters
            </div>
            <div className=''>
            {filtersToggle ?  <FaArrowAltCircleUp style={{ fontSize: '20px' }} />
                            :<FaArrowAltCircleDown style={{ fontSize: '20px' }} />}
            </div>
        
        </button>
    )
}

export default FiltersToggle