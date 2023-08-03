import React from 'react'
import dit from '/src/assets/dit.png';

const Footer = () => {
  return (
    <footer className=" bg-gray-100 shadow-xl border-2 border-t  w-full">
        <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
            <a href="https://www.di.uoa.gr/" target="_blank" rel="noopener noreferrer">
                <img className="w-auto h-12" src={dit} alt=""/>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
                <a href="https://www.di.uoa.gr/sites/default/files/undergraduate_courses_files/DIT_PPS_%CE%A5%CE%A314-InternetApplicationTechnologies.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500"
                    title = "">
                    Course
                </a>
                <a href="https://github.com/kostasalex" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500"
                    title = "">
                    sdi1700003
                </a>
                <a href="https://github.com/BabisSt" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500"
                    title = "">
                    sdi1600278
                </a>
                
            </div>

            <p className="mt-6 text-sm text-gray-500 lg:mt-0 ">© Copyright 2023 <span className='font-semibold'>Team13</span>. </p>
        </div>
    </footer>
  )
}

export default Footer