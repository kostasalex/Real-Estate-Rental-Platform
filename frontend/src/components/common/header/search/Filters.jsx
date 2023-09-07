import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { filterCategories } from "/src/assets/constants";
import ArriveLeaveDate from '/src/components/common/datepicker/ArriveLeaveDate';
import Accommodates from '/src/components/common/inputs/Accommodates';
import Suggestions from '/src/components/common/maps/Suggestions';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

function TabContent({ arrive, leave, activeTab, handleOptionSelect, location, guests }) {

  //console.log(activeTab);

  const [accomError, setAccomError] = React.useState(false);

  const [people, setPeople] = React.useState(guests ? guests : 1 );

  const accommodates = 20;

  const handleSelectSuggestion = (location) => {
    handleOptionSelect(activeTab, location)
  }

  const handleIncrease = () => {
    setAccomError(false)
		if (accommodates!= null && people < accommodates) {
			setPeople(people + 1);
		}
		else 
		{
			setPeople(1);
		}
	};

	const handleDecrease = () => {
    setAccomError(false)
		if (people > 1) {
			setPeople(people - 1);
		}
	};

  const handleDate = (dateType, date) => { 
        handleOptionSelect(dateType, date);
  };

  const handleSearch = () => { 
    handleOptionSelect(activeTab, "");
  };


  return (
    <nav
    className="flex justify-center shadow-inner bg-blue0 py-4 duration-500  rounded-xl   top-24"
    >
      {activeTab === "Location" && (
        <div className='flex flex-col'>

          <Suggestions
            handleSelectSuggestion = {handleSelectSuggestion}
            location = {location}
          />
        </div>

      )}
      
      {activeTab === "Persons" && (
        <div className='flex flex-col items-center'>
          <div className='flex flex-row items-center p-8 space-x-4'>
            <div >
              <Accommodates 
                handleIncrease = {handleIncrease} 
                handleDecrease = {handleDecrease}
                people = {people}
                accommodates = {accommodates}
                setPeople = {setPeople}
                setAccomError = {setAccomError}
                />
            </div>
            <div >
              <button 
                className='ml-4 rounded-lg bg-blue1 px-2 py-1 opacity-80 hover:opacity-100 font-semibold text-white'
                onClick={() => handleOptionSelect(activeTab, people)}
                >
                  ok
              </button>
            </div>
          </div>
          {accomError && (<div className='text-sm text-red-500' >Max persons: {accommodates} </div>)}
        </div>


      )}
      
  
      {activeTab === "Date" && (
          <div className='flex flex-col text-lg text-blue1 font-semibold items-center'>
            <ArriveLeaveDate
              arrive = {arrive} 
              leave = {leave} 
              handleDate = {handleDate}
              />

            </div>
          )}
    </nav>
  );
}



export default function Filters({arrive, leave, handleSearch,handleOptionSelect,filters,activeTab,setActiveTab, location, guests, handleOptionRemove }) {

  const [isFiltersEmpty, setIsFiltersEmpty] =  React.useState(false);

  React.useEffect(() => {
    const checkFiltersEmpty = () => {
      setIsFiltersEmpty(filters.every(value => value === ""));
    };

    checkFiltersEmpty();
  }, [filters]);

  const tabContentTitle =  {'Location': "Search Destination" , 'Date': "Add dates", 'Persons' : "Add persons" };

  function Tab({ label, index, isActive, onClick, Icon, entry }) {
  
    return (
      <div className='flex-col flex justify-center items-center'>

        <li
          title = {"Select " + label}
          className={`cursor-pointer py-2 px-4 shadow-md rounded hover:opacity-100  hover:font-bold transition rounded-3xl ${
            isActive ? "bg-blue1 text-white shadow-2xl " : " opacity-60 text-gray-500"
          }`}
          onClick={() => onClick(index)}
        >
            <div className="flex-row flex items-center">
              {Icon}
              <div className=" ml-2 hidden md:block">  {entry ? entry : label}  </div>
            </div>
          
        </li>
        { (entry ) && 
            (<span 
              title = {"Clear "+label}
              onClick={() => handleOptionRemove(label)}
              className='cursor-pointer flex   pb-1 mt-2 text-sm hover:shadow-inner hover:opacity-100 opacity-60 rounded-xl  text-white'>
                <MdClear  style={{ color: 'black', fontSize: '22px' }} />
            </span>)
        }
      </div>

    );
  }
  


  const handleTabSelect = (category) =>{
    if(category === "Leave" && !arrive)setActiveTab("Arrive")
    else setActiveTab(category)
  }

  return (
    <div className=" flex-col flex ">
      <div className="flex justify-center items-center ">
          <ul className="flex justify-center space-x-2 shadow-inner items-center bg-white p-2 rounded-3xl
          m-4">
            {Object.entries(filterCategories).map(([key, value], index) => (
              <Tab
                key={key}
                label={value.label}
                index={index}
                isActive={activeTab === value.label}
                onClick={() => handleTabSelect(value.label)}
                entry = {filters[index]}
                Icon={value.Icon}
            />
            ))}
          </ul>
          <div 
            title = "Search"
            className={"flex items-center justify-center relative bg-blue1 cursor-pointer p-2 border-4 border-white hover:border-blue1 rounded-full " +( ((activeTab ==="Search" || !activeTab) && !isFiltersEmpty) && "p-4 animate-pulse")}
            onClick={() =>  handleSearch()}>
            <BiSearch style={{ color: 'white', fontSize: '22px' }} />
          </div>

      </div>
      {activeTab && (
        <div className={`flex rounded-2xl justify-center items-start bg-blue1/2 fixed ${activeTab === 'Location' ? 'lg:left-1/3' : 'lg:right-1/3'} top-32`}>
          <div className="flex  flex-col  bg-white text-lg text-blue1 font-semibold items-center shadow-2xl p-5 left-2 rounded-lg relative top-2">
            <div
              className="text-black opacity-60 cursor-pointer hover:opacity-100 py-1 px-2 bg-red-50 rounded-full absolute top-2 right-2"
              onClick={() => setActiveTab("")}
            >
              <FaTimes />
            </div>
            <div className="flex mb-10  justify-center">{tabContentTitle[activeTab]}</div>

            <TabContent
              activeTab={activeTab}
              handleOptionSelect={handleOptionSelect}
              arrive={arrive}
              leave={leave}
              handleSearch = {handleSearch}
              location = {location}
              guests = {guests}
            />
          </div>
        </div>
      )}


    </div>

  );
}