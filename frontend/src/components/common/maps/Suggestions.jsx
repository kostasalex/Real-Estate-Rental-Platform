import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Autosuggest from 'react-autosuggest';

const Suggestions = ({ handleSelectSuggestion, location}) => {

    const [searchQuery, setSearchQuery] = useState(location);

    const searchTimeoutRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = async (value) => {
        try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
        const data = await response.json();
        if (data && data.length > 0) {
                return data.map((item) => {
                const displayName = item.display_name;
                const words = displayName.split(',');
                /* Keep the info needed from display_name 
                for example from: "Manchester, Greater Manchester, North West England, England, United Kingdom"
                it keeps "Manchester, England, United Kingdom"*/
                const formattedName = words[0] + ',' + words[words.length - 2] + ',' + words[words.length - 1];
                return formattedName;
            });
        }
        } catch (error) {
        console.error('Error occurred during geocoding:', error);
        }
        return [];
    };

    const handleSuggestionSelected = (event, { suggestion }) => {
        handleSelectSuggestion(suggestion);
    };


    const handleSuggestionsFetchRequested = async ({ value }) => {
        const suggestions = await getSuggestions(value);
        setSuggestions(suggestions);
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        clearTimeout(searchTimeoutRef.current); // Clear previous search timeout

        // Set timeout to fetch suggestions after a delay of 500 milliseconds
        searchTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(query);
        }, 500);
    };
    

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSelectSuggestion(searchQuery);
      }
    };

  const fetchSuggestions = async (query) => {
    const suggestions = await getSuggestions(query);
    setSuggestions(suggestions);
  };

  const inputProps = {
    value: searchQuery,
    onKeyDown: handleKeyDown,
    onChange: handleSearchChange,
    placeholder: 'Enter a town',
    className: "j p-1 pl-3"
  };

  const renderSuggestion = (suggestion) => (
                <div class="pl-8 pr-2 py-1 border-b-2  border-gray-50 relative cursor-pointer hover:bg-blue1 rounded-md hover:text-white">
                    <svg class="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    <b>{suggestion}</b>
                </div>
  );

  return (
    <div className="flex p-10 flex-col relative items-center text-gray-600 justify-center">
        <div className="flex w-96 items-center justify-center">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
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
