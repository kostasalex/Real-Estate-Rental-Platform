import React from 'react'
import {Link} from "react-router-dom"
import {FaUserCircle}  from "react-icons/fa";
import {FaUserCheck}  from "react-icons/fa";


const UserMenu = ({loggedInUserType, handleLogout}) => {

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
                            className=" flex flex-col text-left mt-3 shadow-lg w-32 bg-white absolute duration-500  ">
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
                                <div className="flex rounded-lg px-4 py-2 text-gray-500 opacity-80">
                                        <span 
                                            className="mr-3 text-sm font-medium"
                                            >
                                            Dashboard 
                                        </span>
                                </div>  
                                <div className="flex  cursor-pointer px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => handleLogout()}>
                                        <span 
                                            className="mr-3 text-sm font-medium">
                                            Exit 
                                        </span>
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