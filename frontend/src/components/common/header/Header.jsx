import React from 'react'
import {Link} from "react-router-dom"
import UserMenu from './UserMenu'
import Logo from '/src/assets/logo.png';
import LogoSmall from '/src/assets/logosmall.png';
import Search from './search/Search'
import Swal from "sweetalert2";  
import {useNavigate} from 'react-router-dom';


const Header = (props) => {
    const navigate = useNavigate();

    const becomeHostHandler = async () => {
        if (!props.loggedInUserType) {
            navigate("signup", { state: { toggle: true }});
        } else {
            try {
            const response = await fetch("http://localhost:8080/become-host", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: props.loggedInUserId }),
            });
        
            if (response.ok) {
                Swal.fire({
                title: "Application Received",
                text: "We will notify you as soon as it is approved",
                icon: "success",
                confirmButtonText: "OK",
                showCloseButton: true,
                }).then(() => {
                    props.handleUserType('PendingHost');
                });
            } else {
                Swal.fire({
                title: "Error",
                text: "Failed to submit application",
                icon: "error",
                confirmButtonText: "OK",
                showCloseButton: true,
                });
            }
            } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to submit application",
                icon: "error",
                confirmButtonText: "OK",
            });
            }
        }
    };
        

    const rentHandler = () => {

        navigate('/newlisting')
        /*Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Host Application Pending.',
            showConfirmButton: false,
            timer: 1500
          })*/

    };

    return (
        <div>
            <nav className=" bg-white z-10 top-0 w-full fixed shadow-md flex  justify-between  mx-auto px-8">
                {/*Logo*/}
                <div className="hidden sm:block lg:ml-12 mt-2 inline-flex">
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
       
                    <div className="flex justify-end relative mt-4">
                    
                    
                            <div className="font-semibold inline-block hidden md:block py-2 px-3 opacity-70   rounded-full" >
                                {
                                (props.loggedInUserType === "Seeker" || !props.loggedInUserType)  && 
                                 (<div 
                                    className="flex items-center relative  cursor-pointer hover:shadow-xl whitespace-nowrap"
                                    onClick= {becomeHostHandler}
                                    >
                                        Become a host
                                 </div>)}
                                 {props.loggedInUserType === "PendingHost" && (<div 
                                    className="flex items-center relative whitespace-nowrap"
                                    title = "Waiting For Host Approval"
                                    >
                                        Applied For Host
                                 </div>)
                                }
                                {props.loggedInUserType === "Host" && (<div 
                                    className="flex items-center relative  cursor-pointer  hover:shadow-xl whitespace-nowrap"
                                    onClick= {rentHandler}
                                    >
                                        Rent out Property
                                 </div>)
                                }
                            </div>
                
                        <UserMenu loggedInUserType = {props.loggedInUserType} handleDashboard={props.handleDashboard} handleLogout = {props.handleLogout} handleMessages={props.handleMessages}/>
                    </div>
        
           


                {/*end login*/}
            </nav>

        </div>

    )
}

export default Header
