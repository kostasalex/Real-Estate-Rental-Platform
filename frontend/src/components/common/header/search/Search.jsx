import React from 'react'
import SearchBar from './SearchBar';
import Filters from './Filters';
import { useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import dayjs from 'dayjs';
const Search = () => {  

    
    const location_ = useLocation();
    const queryParams = new URLSearchParams(location_.search);
    const navigate = useNavigate();
    /* False for searchbar and true for filters */
    const [filtersToggle, setfiltersToggle] = React.useState(false);

    /* A list of strings for all filters selected */
    const [filtersSelected, setFiltersSelected ] = React.useState([]);

    /* Filters */
    const [location, setLocation] = useState("");
    const [arrive, setArrive] = useState("");
    const [leave, setLeave] = useState("");
    const [guests, setGuests] = useState("");
    const [date, setDate] = useState("");



    const getDateString = (date) => {
        return date.format('DD/MM/YY');
    }

    /*  For filters tab */
    const [activeTab, setActiveTab] = useState("Location");

    React.useEffect(() => {

        const arriveStr = queryParams.get('arrive');
        if(arriveStr)setArrive(dayjs(arriveStr));
        const leaveStr = queryParams.get('leave');
        if(leaveStr){
            setLeave(dayjs(leaveStr));
            const date = arriveStr + "-" + leaveStr;
            setDate(date);
        }
        setLocation(queryParams.get('location') || ''),
        setGuests(queryParams.get('guests') || '')
      }, []);
    

    React.useEffect(() => {
        let persons = ""
        if(guests)persons = guests + " persons"
        if(location || date || guests){
            setFiltersSelected([location  , date , persons]) 
        }

    }, [location, arrive, leave, guests, date]);

    const handleOptionSelect = (filter, option) => {
        
        console.log(option);
        switch (filter) {
        case "Location":
            setLocation(option);
            setActiveTab("Date");
            break;
        case "Arrive":
            setArrive(option);
            //setActiveTab("Leave");

            break;
        case "Leave":
            if(option > arrive){
                setLeave(option); 
                setDate(getDateString(arrive) + " - " + getDateString(option));
                setActiveTab("Persons");
            }

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


    const handleOptionRemove = (filter) => {
        let persons
        if(guests)persons = guests + " persons"
        console.log(filter)
        switch (filter) {
            case "Location":
                setLocation("");
                setFiltersSelected([""  , date , persons]) 
                console.log(location);
                break;
            case "Date":
                console.log("arrive- leave");
                setArrive("");
                setLeave(""); 
                setDate("");
                setFiltersSelected([location  , "" , persons]) 
                console.log("2arrive- leave2");
                break;
            case "Persons":
                setGuests("");
                setFiltersSelected([location  , date , ""]) 
                break;
            default:
                break;
        }
        let url
        if(filter === "Date")
            url =  removeParam("arrive");
        else if (filter === "Persons") 
            url = removeParam("guests");
        else url = removeParam(filter);

        navigate(url);
    };


    const removeParam = (parameter) => {
        const param = parameter.toLowerCase();
        console.log("removing: " + param);
        const queryParams = new URLSearchParams(location_.search);
        if(queryParams.get(param)){
            queryParams.delete(param);
            const newUrl = `${location_.pathname}?${queryParams.toString()}`;
            console.log(newUrl);
            return newUrl;
        }
    }

    const handleFiltersToggle= () => {
        setfiltersToggle(!filtersToggle);
    };

    const handleSearch= () => {

        setfiltersToggle(false);

  

        const getDateString = (date) => {
            return date.format('DD/MM/YY');
          };
          
          const queryParams = Object.entries({ location, arrive, leave, guests })
            .filter(([_, value]) => value !== '') // filter out empty values
            .map(([key, value]) => {
              if (key === 'arrive' || key === 'leave') {
                value = getDateString(value); // format date value using getDateString function
              }
              if( key === 'arrive' && !leave)value = '';
              return `${key}=${encodeURIComponent(value)}`;
            })
            .join('&');
          
        
        console.log(queryParams)
        const url = `/results/q?${queryParams}`;
      
        
        navigate(url);

    };

    return (
        <div>
            {!filtersToggle && <SearchBar  handleFiltersToggle =  {handleFiltersToggle} filtersSelected ={filtersSelected}/>}   
            {filtersToggle && <Filters 
                handleSearch = {handleSearch}
                handleOptionSelect = {handleOptionSelect}
                filters = {filtersSelected}
                activeTab = {activeTab}
                setActiveTab = {setActiveTab}
                arrive = {arrive}
                leave = {leave}
                location = {location}
                guests = {guests}
                handleOptionRemove = {handleOptionRemove}
                />}  
        </div>
    )
}

export default Search