import React from 'react'
import {Link} from "react-router-dom"
const UserMenu = () => {

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

                        <div className="block flex-grow-0 flex-shrink-0 h-10 lg:w-12 w-7 lg:pl-5">
                            <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                className="block h-full w-full fill-slate-700"
                            >
                                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                            </svg>
                        </div>
                    </button>

                   {isMenuOpen === true && (

                        <nav 
                            onClick={handleMenuToggle}
                            className=" flex flex-col text-left mt-3 shadow-lg w-32 bg-white absolute duration-500  ">
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
                        </nav>

                    )}
                </div>
            </div>
    )
}

export default UserMenu