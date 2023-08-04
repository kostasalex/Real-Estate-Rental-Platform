import React from 'react'
import {MdSpaceDashboard} from "react-icons/md"

const DashboardToggle = ({handleDashboard}) => {
  return (
    <button 
        title = "Move to Dashboard"
        className='flex flex-row border-y-4 border-r-4 hover:text-white  border-gray-600 fixed py-10 top-80 hover:bg-blue1 bg-transparent -left-24  items-center  justify-end shadow-xl xl:mt-0 mt-20 bg-gray-900 rounded-xl px-2 py-1 transition duration-300 transform hover:translate-y--2 text-black  hover:translate-x-24'
        onClick={handleDashboard}>
        <div className='mr-2 font-semibold   text-lg'>
            Admin <br/> Dashboard
        </div>
        <div className=''>
        <MdSpaceDashboard style={{ fontSize: '32px', color: 'black'}} />
        </div>
    </button> 
  )
}

export default DashboardToggle