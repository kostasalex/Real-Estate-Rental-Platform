import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { filterCategories } from "/src/assets/constants";
import ArriveLeaveDate from '/src/components/common/datepicker/ArriveLeaveDate';

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


function TabContent({ arrive, leave, activeTab,  handleOptionSelect}) {


  const handleDate = (dateType, date) => { 
        handleOptionSelect(dateType, date);
  };


  let activeOption
  if(activeTab)
    activeOption = options.find((option) => option.category === activeTab);
  else return null;

  return (
    <nav
    className="flex justify-center shadow-inner bg-blue0 py-4 duration-500 rounded-xl bg-gray-1500 top-20"
    >
      {activeTab === "Location" && (activeOption.items.map((item, index) => (
        <div
          key={index}
          className="flex  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          onClick={() => handleOptionSelect(activeTab, item)}
        >
          <span className="mr-3 text-sm font-medium">{item}</span>
        </div>
      )))}
      
      {activeTab === "Persons" && (activeOption.items.map((item, index) => (
        <div
          key={index}
          className="flex  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          onClick={() => handleOptionSelect(activeTab, item)}
        >
          <span className="mr-3 text-sm font-medium">{item}</span>
        </div>
      )))}
  
      {activeTab === "Date" && (
      <ArriveLeaveDate
        arrive = {arrive} 
        leave = {leave} 
        handleDate = {handleDate}/>)}
    </nav>
  );
}



export default function Filters({arrive, leave, handleSearch,handleOptionSelect,filters,activeTab,setActiveTab }) {

  
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
            className={"flex items-center justify-center relative bg-blue1 cursor-pointer p-2 border-4 border-white hover:border-blue1 rounded-full " +( !activeTab && "animate-pulse")}
            onClick={() =>  handleSearch()}>
            <BiSearch style={{ color: 'white', fontSize: '22px' }} />
          </div>

      </div>
      <TabContent 
        activeTab = {activeTab} 
        handleOptionSelect = {handleOptionSelect}
        arrive = {arrive}
        leave = {leave}
        />

    </div>

  );
}