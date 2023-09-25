import React, { useEffect, useState } from 'react';
import Cards from '../Cards';
import { useNavigate } from 'react-router-dom';
import { Recommendation } from '/src/components';

const HostHomepage = ({ hosts_id }) => {
  const [recentListings, setRecentListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  const newListingHandler = () => {
    navigate('/newlisting');
  };

  const NUM_RESULTS = 100;

  useEffect(() => {
    // Fetch recent listings (without hosts_id filter)
    fetch('https://localhost:8443/cards')
      .then((response) => response.json())
      .then((data) => setRecentListings(data.slice(0, NUM_RESULTS)))
      .catch((error) => console.error(error));

      // Fetch listings for the logged-in host (using hosts_id)
    fetch(`https://localhost:8443/cards?hosts_id=${hosts_id}`)
      .then((response) => response.json())
      .then((data) => setMyListings(data))
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <div className="flex flex-col space-y-16">
      <div className="mt-10 justify-center text-blue1 font-semibold hover:opacity-90 flex flex-col">
        <button className="justify-center text-3xl flex" onClick={newListingHandler}>
          Add New Listing
        </button>
        <div className="flex justify-center text-3xl">+</div>
      </div>
      <div className="mt-2">
        <div className="justify-center text-gray-900 text-3xl flex"> My Listings </div>
        <div className="justify-center flex">
          <Cards listings={myListings.slice(0, NUM_RESULTS)} />
        </div>
      </div>
      <div className="mt-2">
        <Recommendation/>
      </div>
      <div className="mt-2">
        <div className="justify-center text-gray-900 text-3xl flex"> Recent Listings </div>
        <div className="justify-center flex">
          <Cards listings={recentListings} />
        </div>
      </div>
    </div>
  );
};

export default HostHomepage;
