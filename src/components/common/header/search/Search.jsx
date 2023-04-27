import React from 'react'
import SearchBar from './SearchBar';
import Filters from './Filters';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Search = () => {  

    const navigate = useNavigate();

    /* False for searchbar and true for filters */
    const [filtersToggle, setfiltersToggle] = React.useState(false);

    /* A list of strings for all filters selected */
    const [filtersSelected, setFiltersSelected ] = React.useState([]);

    /* Filters */
    const [location, setLocation] = useState("");
    const [homeType, setHomeType] = useState("");
    const [arrive, setArrive] = useState("");
    const [leave, setLeave] = useState("");
    const [guests, setGuests] = useState("");
    const filters = [location, homeType, arrive, leave, guests];

    /*  For filters tab */
    const [activeTab, setActiveTab] = useState("Location");

    const handleOptionSelect = (filter, option) => {
        switch (filter) {
        case "Location":
            setLocation(option);
            setActiveTab("HomeType");
            break;
        case "HomeType":
            setHomeType(option);
            setActiveTab("Arrive");
            break;
        case "Arrive":
            setArrive(option);
            setActiveTab("Leave");
            break;
        case "Leave":
            setLeave(option); 
            setActiveTab("Persons");
            break;
        case "Persons":
            setGuests(option);
            setActiveTab("");
            //handleSearch([location, homeType, arrive, leave ,guests]);
            break;
        default:
            break;
        }
    };

    const handleFiltersToggle= () => {
        setfiltersToggle(!filtersToggle);
    };

    const handleSearch= () => {
        let date = ""
        let persons = ""
        if(arrive && leave)date = arrive + " - " + leave
        if(guests)persons = guests + " persons"
        if(location || homeType || date || guests){
            setFiltersSelected([location , homeType , date , persons]) 
        }
        setfiltersToggle(false);

        const queryParams = Object.entries({ location, homeType, arrive, leave, guests })
            .filter(([value]) => value !== "")
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
    
        const url = `/results/q?${queryParams}`;
        
        navigate(url);

    };

    return (
        <div>
            {!filtersToggle && <SearchBar  handleFiltersToggle =  {handleFiltersToggle} filtersSelected ={filtersSelected}/>}   
            {filtersToggle && <Filters 
                handleSearch = {handleSearch}
                handleOptionSelect = {handleOptionSelect}
                filters = {filters}
                activeTab = {activeTab}
                setActiveTab = {setActiveTab}
                arrive = {arrive}
                />}  
        </div>
    )
}

export default Search