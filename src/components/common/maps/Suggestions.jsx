import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Autosuggest from 'react-autosuggest';

const Suggestions = ({ handleSelectSuggestion}) => {

    const [searchQuery, setSearchQuery] = useState('');
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



  const fetchSuggestions = async (query) => {
    const suggestions = await getSuggestions(query);
    setSuggestions(suggestions);
  };

  const inputProps = {
    value: searchQuery,
    onChange: handleSearchChange,
    placeholder: 'Enter a town',
  };

  const renderSuggestion = (suggestion) => (
    <div className="hover:bg-gray-50 hover:text-blue1 text-gray-500 cursor-pointer">{suggestion}</div>
  );

  return (
    <div className="flex p-10 flex-col items-center text-gray-600 justify-center">
        <div className="relative">
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
