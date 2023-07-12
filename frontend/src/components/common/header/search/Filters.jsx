import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { filterCategories } from "/src/assets/constants";
import ArriveLeaveDate from '/src/components/common/datepicker/ArriveLeaveDate';
import Accommodates from '/src/components/common/inputs/Accommodates';
import Suggestions from '/src/components/common/maps/Suggestions';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa';
  //"Dummy" data in order to test the filters functionality
  const options = [
    {
      category: "Location",
      items: ["New York", "Paris", "Tokyo", "London", "Sydney"],
    },

    {
      category: "Persons",
      items: ["1", "2", "3", "4", "5"],
    },
  ];


function TabContent({ arrive, leave, activeTab, handleOptionSelect}) {

  const [people, setPeople] = React.useState(1);

  const accommodates = 20;

  const handleSelectSuggestion = (location) => {
    console.log(location)
    handleOptionSelect(activeTab, location)
  }

  const handleIncrease = () => {
		if (accommodates!= null && people < accommodates) {
			setPeople(people + 1);
		}
		else 
		{
			setPeople(1);
		}
	};

	const handleDecrease = () => {
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



  let activeOption
  if(activeTab)
    activeOption = options.find((option) => option.category === activeTab);
  else return null;

  return (
    <nav
    className="flex justify-center shadow-inner bg-blue0 py-4 duration-500 rounded-xl bg-gray-1500 top-20"
    >
      {activeTab === "Location" && (
        <div className='flex flex-col'>

          <Suggestions
            handleSelectSuggestion = {handleSelectSuggestion}
          />
        </div>

      )}
      
      {activeTab === "Persons" && (
        <div className='flex flex-row items-center p-10 space-x-4'>
          <div className=''>
            <Accommodates 
            handleIncrease = {handleIncrease} 
            handleDecrease = {handleDecrease}
            people = {people}
            accommodates = {accommodates}/>
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

        {activeTab === "Search" && (
          <button 
            className='flex flex-row text-lg opacity-80 shadow-xl hover:opacity-100 hover:shadow-2xl bg-blue1 rounded-full py-3 px-4 m-10 text-white font-semibold items-center'
            onClick={() =>  handleSearch()}
            >
            
            <div className='mr-2 mb-1'>Search</div>
            <BiSearch style={{ color: 'white', fontSize: '24px' }} />
          </button>
        )}
    </nav>
  );
}



export default function Filters({arrive, leave, handleSearch,handleOptionSelect,filters,activeTab,setActiveTab }) {

  const tabContentTitle =  {'Location': "Search Destination" , 'Date': "Add dates", 'Persons' : "Add persons" };

  function Tab({ label, index, isActive, onClick, Icon, entry }) {
  
    return (
      <li
        className={`cursor-pointer py-2 px-4 shadow-md rounded hover:opacity-100 transition rounded-3xl ${
          isActive ? "bg-blue1 text-white shadow-2xl " : " opacity-60 text-gray-500"
        }`}
        onClick={() => onClick(index)}
      >
          <div className="flex-row flex items-center">
            {Icon}
            <div className=" ml-2 hidden md:block">  {entry ? entry : label}  </div>
          </div>
      </li>
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
            className={"flex items-center justify-center relative bg-blue1 cursor-pointer p-2 border-4 border-white hover:border-blue1 rounded-full " +( (activeTab ==="Search" || !activeTab) && "animate-pulse")}
            onClick={() =>  handleSearch()}>
            <BiSearch style={{ color: 'white', fontSize: '22px' }} />
          </div>

      </div>
      {activeTab && (
        <div className="flex rounded-2xl  justify-center items-start  fixed inset inset-20">
          <div className="bg-white text-lg text-blue1 font-semibold items-center shadow-2xl p-5 relative">
            <div
              className="text-black opacity-60 cursor-pointer hover:opacity-100 py-1 px-2 bg-red-50 rounded-full absolute top-2 right-2"
              onClick={() => setActiveTab("")}
            >
              <FaTimes />
            </div>
            <div className="flex mb-10 justify-center">{tabContentTitle[activeTab]}</div>

            <TabContent
              activeTab={activeTab}
              handleOptionSelect={handleOptionSelect}
              arrive={arrive}
              leave={leave}
              handleSearch = {handleSearch}
            />
          </div>
        </div>
      )}


    </div>

  );
}