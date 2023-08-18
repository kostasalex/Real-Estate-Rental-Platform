import React, { useState, useEffect, useRef } from 'react';
import Cards from '../Cards';


const SeekerHomepage = () => {
    const [suggested, setSuggested] = React.useState([]);
    const [recent, setRecent] = React.useState([]);
    const NUM_RESULTS = 13;
    const NUM_RESULTS2 = 10;
    
    React.useEffect(() => {
      fetch("https://localhost:8443/cards")
        .then((response) => response.json())
        .then((data) => {
          setSuggested(data.slice(10, NUM_RESULTS));
          setRecent(data.slice(7, NUM_RESULTS2));
        })
        .catch((error) => console.error(error));
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