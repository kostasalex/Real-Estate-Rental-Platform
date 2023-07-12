import React from 'react'
import Cards from '../Cards';
import Papa from "papaparse";
import {useNavigate} from 'react-router-dom';



const HostHomepage = () => {
    const [recent, setRecent] = React.useState([]);
    const navigate = useNavigate();

    const newListingHandler = () => {
      navigate('/newlisting')
    };

    const NUM_RESULTS = 3;

    React.useEffect(() => {
        Papa.parse("/src/assets/listings.csv", {
          download: true,
          header: true,
          complete: (results) => {
            // Randomly select NUM_RESULTS rows from the CSV file
            const shuffled = results.data.sort(() => 0.5 - Math.random());
            const randomRows = shuffled.slice(0, NUM_RESULTS);
            setRecent(randomRows);
          },
        });
      }, []);
      

  return (
    <div className='flex flex-col space-y-16'>
        <div className='mt-10 justify-center  text-blue1 font-semibold hover:opacity-90 flex flex-col'>
            <button 
              className='justify-center  text-3xl flex'
              onClick= {newListingHandler}
              > Add New Listing  
              </button>
            <div className=' flex justify-center text-3xl '>+</div>
        </div>
        <div className='mt-2 '>
            <div className='justify-center text-gray-900 text-3xl flex'> Recent Listings  </div>
            <div className='justify-center flex'> <Cards listings = {recent}/>  </div>
            
        </div>
    </div>
  )
}

export default HostHomepage
