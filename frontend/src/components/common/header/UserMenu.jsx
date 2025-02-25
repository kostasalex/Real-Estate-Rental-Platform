import React from 'react'
import {Link} from "react-router-dom"
import {FaUserCircle, FaUserCheck}  from "react-icons/fa";
import {ImExit} from "react-icons/im"
import {BsChatSquareTextFill} from "react-icons/bs"
import {IoMdSettings} from "react-icons/io"
import {MdSpaceDashboard} from "react-icons/md"

const UserMenu = ({loggedInUserType, handleLogout, handleMessages, handleDashboard, handleEditProfile}) => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuRef = React.useRef(null);
  
    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
  
    React.useEffect(() => {
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };

    }, []);
        
    return (
            <div className="block lg:mr-12">
                <div className="inline relative" ref={menuRef}>
                    <button className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg"
                            onClick={() => handleMenuToggle()}
                    >
                        <div className="hidden sm:block pl-1">
                            <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="block fill-none h-[16px] w-[16px] stroke-current stroke-[3] overflow-visible"
                            >
                                <g fill="none" >
                                    <path d="m2 16h28"></path>
                                    <path d="m2 24h28"></path>
                                    <path d="m2 8h28"></path>
                                </g>
                            </svg>
                        </div>

                        <div className="block h-full w-full p-1 flex-grow-0 flex-shrink-0 h-10 lg:w-12 w-7 lg:pl-5">
                            {!loggedInUserType && <FaUserCircle style={{ fontSize: '30px',color: '#333' }}/>}
                            {loggedInUserType && <FaUserCheck style={{ fontSize: '30px',color: '' }}/>}
                        </div>
                    </button>

                   {isMenuOpen === true && (

                        <nav 
                            onClick={handleMenuToggle}
                            className=" flex flex-col right-1 lg:left-0 text-left mt-3  shadow-lg w-40 bg-white absolute duration-500  ">
                            {!loggedInUserType && 
                                <div>
                                    <Link to ="/signup">
                                        <div className="flex  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            <span className="mr-3 text-sm font-medium"> Sign Up </span>
                                        </div>
                                    </Link>
                                    <Link to ="/login">
                                        <div className="flex  rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                            <span className="mr-3 text-sm font-medium"> Login </span>
                                        </div>
                                    </Link>
                                </div>
                            }
                            {loggedInUserType && 
                            <div>
                                <div className="flex cursor-pointer rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    onClick={() => handleEditProfile()}>
                                    <div className='rounded-full p-1 mr-2'>
                                        <IoMdSettings/>
                                    </div>
                                    <div 
                                        className="mr-3 text-sm font-medium"
                                        >
                                        Edit Profile
                                    </div>
                                </div> 
                               {loggedInUserType === "Admin" && (
                                <div className="flex cursor-pointer rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    onClick={() => handleDashboard()}>
                                    <div className='rounded-full p-1 mr-2'>
                                        <MdSpaceDashboard/>
                                    </div>
                                    <div 
                                        className="mr-3 text-sm font-medium"
                                        >
                                        Dashboard 
                                    </div>
                                </div>
                               )}
                                {loggedInUserType != "Admin" && (
                                <div className="flex cursor-pointer rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    onClick={() => handleMessages()}>
                                    <div className='rounded-full p-1 mr-2'>
                                        <BsChatSquareTextFill/>
                                    </div>
                                    <div 
                                        className="mr-3 text-sm font-medium"
                                        >
                                        Messages 
                                    </div>
                                </div> 
                                )} 
                                <div className="flex  items-center cursor-pointer px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => handleLogout()}>

                                        <div className='rounded-full p-1 mr-2'>
                                            <ImExit/>
                                        </div>
                                        <div 
                                            className="mr-3 text-sm font-medium">
                                            Exit 
                                        </div>
                                </div>                              
                            </div>
                            }
                        </nav>

                    )}
                </div>
            </div>
    )
}

export default UserMenu