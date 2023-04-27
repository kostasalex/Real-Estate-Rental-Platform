import React from 'react'
import {Link} from "react-router-dom"
import SearchBar from './search/SearchBar'
import Filters from './search/Filters'
import UserMenu from './UserMenu'
import Logo from '/src/assets/logo.png';
import LogoSmall from '/src/assets/logosmall.png';
import Search from './search/Search'

const Header = () => {


    return (
        <div>
            <nav className=" bg-white top-0 w-full fixed shadow-md flex  justify-between items-center mx-auto px-8 h-20 ">
                {/*Logo*/}
                <div className="hidden sm:block lg:ml-12 inline-flex">
                    <Link className="_o6689fn" to="/"
                        ><div className="hidden md:block">
                            <img src={Logo} alt="My logo" className="block" />
                        </div>
                        <div className="block md:hidden">
                            <img src={LogoSmall} alt="My logo" className="block" />
                        </div>
                    </Link>
                </div>
                {/*end logo*/}
                <div className='flex flex-col'>
                    <Search/>
                </div>

                {/*login*/}
                <div className="flex-initial">
                    <div className="flex justify-end items-center relative">
                    
                        <div className="flex mr-4 items-center">
                            <div className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" >
                                <div className="flex items-center relative cursor-pointer whitespace-nowrap">Become a host</div>
                            </div>
                        </div>

                        <UserMenu/>
                    </div>
        
                </div>


                {/*end login*/}
            </nav>

        </div>

    )
}

export default Header
