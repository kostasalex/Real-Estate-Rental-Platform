import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import Fuse from 'fuse.js';

const tabs = ['Country', 'City', 'Street'];
const categories = ['countries', 'cities', 'streets'];

const Suggestions = ({ handleSelectSuggestion, location }) => {
    const [searchQuery, setSearchQuery] = useState(location);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    let previousTab = parseInt(localStorage.getItem('selectedTab') || "0", 10);
    const [currentTab, setCurrentTab] = useState((previousTab && searchQuery) ? previousTab : 0);
    console.log(currentTab)
    const placeholders = {
        Country: 'Greece',
        City: 'Athens',
        Street: 'Arkadias'
    };


    useEffect(() => {
      localStorage.setItem('selectedTab', currentTab);
      fetchSuggestions(categories[currentTab]);
    }, [currentTab]);

    useEffect(() => {
      if (searchQuery) {
          // Setup Fuse.js for fuzzy searching
          const fuse = new Fuse(suggestions, { 
            keys: ['name'], 
            includeScore: true, 
            threshold: 0.3,  // Lower the threshold
            location: 0, 
            distance: 100, 
            maxPatternLength: 32, 
            minMatchCharLength: 1, 
            shouldSort: true, 
            tokenize: true,  // Enable tokenization
            matchAllTokens: true  // Ensure all tokens must be a match
        });
        
          const results = fuse.search(searchQuery);
          // Map over results and return only the item (ignoring the score)
          setFilteredSuggestions(results.map(result => result.item));
      }
    }, [searchQuery, suggestions]);

    const fetchSuggestions = async (tab) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/cards/${tab}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error occurred:', error);
            setSuggestions([]);
        }
    };

    const handleSuggestionSelected = (event, { suggestion }) => {
        handleSelectSuggestion(suggestion);
    };


    /*const handleSuggestionsFetchRequested = ({ value }) => {
      setSearchQuery(value);
      // Setup Fuse.js for fuzzy searching
      const fuse = new Fuse(suggestions, { keys: ['name'], includeScore: true });
      const results = fuse.search(value);
      // Map over results and return only the item (ignoring the score)
      console.log(suggestions)
      console.log(currentTab)
      setFilteredSuggestions(results.map(result => result.item));
  };  */
  
    const handleSuggestionsClearRequested = () => {
      setFilteredSuggestions([]);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSelectSuggestion(searchQuery);
      }
    };

    const inputProps = {
        value: searchQuery,
        onKeyDown: handleKeyDown,
        onChange: (event, { newValue }) => setSearchQuery(newValue),
        placeholder: placeholders[tabs[currentTab]],
        className: "j p-1 pl-3"
    };

    const renderSuggestion = (suggestion) => (
        <div className="pl-8 pr-2 py-1 border-b-2  border-gray-50 relative cursor-pointer hover:bg-blue1 rounded-md hover:text-white">
            <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            <b>{suggestion}</b>
        </div>
    );

    return (
      <div className="flex p-10 flex-col relative items-center space-y-3 text-gray-600 justify-center">
        <div className='flex flex-col justify-center items-center '>
          <div className=" flex text-lg items-center justify-center mr-3 font-bold mb-4 text-gray-600">Search by:</div>
            <div className="flex justify-center bg-gray-200 rounded-full  mb-5">
                  {tabs.map((tab, index) => (
                      <div 
                          className={`tab mx-2 px-4  hover:opacity-100 py-2 cursor-pointer rounded-full ${index === currentTab ? 'bg-blue1 shadow-xl text-white' : 'opacity-70 bg-gray-200'}`}
                          onClick={() => {
                              setCurrentTab(index);
                          }}
                      >
                          {tab}
                      </div>
                  ))}
              </div>
          </div>
            <div className="flex w-96 items-center justify-center">
                <Autosuggest
                    suggestions={filteredSuggestions}
                    onSuggestionsFetchRequested={() => {}}
                    //onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={(suggestion) => suggestion}
                    renderSuggestion={renderSuggestion}
                    onSuggestionSelected={handleSuggestionSelected}
                    inputProps={inputProps}
                />
            </div>
        </div>
    );
};

export default Suggestions;
