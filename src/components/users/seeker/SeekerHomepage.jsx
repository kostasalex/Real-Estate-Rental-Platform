import React from 'react'
import Cards from '../Cards';
import Papa from "papaparse";

const SeekerHomepage = () => {
    const [suggested, setSuggested] = React.useState([]);
    const [recent, setRecent] = React.useState([]);

    const NUM_RESULTS = 3;

    React.useEffect(() => {
        Papa.parse("/src/assets/listings.csv", {
          download: true,
          header: true,
          complete: (results) => {
            // Randomly select NUM_RESULTS rows from the CSV file
            const shuffled = results.data.sort(() => 0.5 - Math.random());
            const randomRows1 = shuffled.slice(0, NUM_RESULTS);
            const randomRows2 = shuffled.slice(NUM_RESULTS, NUM_RESULTS * 2);
            setSuggested(randomRows1);
            setRecent(randomRows2);
          },
        });
      }, []);
      

  return (
    <div className='flex flex-col space-y-16'>
        <div className='m-t-2 '>
            <div className='justify-center text-gray-900 text-3xl flex'> Suggested Listings  </div>
            <div className='justify-center flex'> <Cards listings = {suggested}/>  </div>
            
        </div>
        <div className='m-t-2 '>
            <div className='justify-center text-gray-900 text-3xl flex'> Recent Listings  </div>
            <div className='justify-center flex'> <Cards listings = {recent}/>  </div>
        </div>

    </div>
  )
}

export default SeekerHomepage