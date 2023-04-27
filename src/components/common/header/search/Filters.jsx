
import { BiSearch } from 'react-icons/bi';
import { filterCategories } from "/src/assets/constants";

  //"Dummy" data in order to test the filters functionality
  const options = [
    {
      category: "Location",
      items: ["New York", "Paris", "Tokyo", "London", "Sydney"],
    },
    {
      category: "HomeType",
      items: ["Hotel", "Apartment", "Villa", "Cabin", "Treehouse"],
    },
    {
      category: "Arrive",
      items: ["7 june", "8 june", "9 june", "10 june"],
    },
    {
      category: "Leave",
      items: ["7 july", "8 july", "9 july", "10 july"],

    },
    {
      category: "Persons",
      items: ["1", "2", "3", "4", "5"],
    },
  ];


function TabContent({ activeTab,  handleOptionSelect}) {


  let activeOption
  if(activeTab)
    activeOption = options.find((option) => option.category === activeTab);
  else return null;

  return (
    <nav
      className=" shadow-lg w-32  bg-white  duration-500 fixed  right-1/2 top-20"
    >
      {activeOption.items.map((item, index) => (
        <div
          key={index}
          className="flex  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          onClick={() => handleOptionSelect(activeTab, item)}
        >
          <span className="mr-3 text-sm font-medium">{item}</span>
        </div>
      ))}
    </nav>
  );
}



export default function Filters({arrive, handleSearch,handleOptionSelect,filters,activeTab,setActiveTab }) {

  
  function Tab({ label, index, isActive, onClick, Icon, entry }) {
  
    return (
      <li
        className={`cursor-pointer py-2 px-4 shadow-md rounded hover:opacity-100 transition rounded-3xl ${
          isActive ? "bg-blue1 text-white shadow-2xl " : " opacity-60 text-gray-500"
        }`}
        onClick={() => onClick(index)}
      >
        <div>
          <div className="flex-row flex items-center">
            {Icon}
            <div className=" ml-2 hidden md:block">  {entry ? entry : label}  </div>
          </div>
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
      <div className="flex flex-row justify-center items-center h-screen">
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
      <TabContent activeTab = {activeTab} handleOptionSelect = {handleOptionSelect}/>

    </div>

  );
}
