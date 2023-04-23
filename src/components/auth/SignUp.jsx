import React from 'react'
import { signup } from '/src/assets/constants'
import {FiSearch}  from 'react-icons/fi'; 
import {GoHome} from 'react-icons/go';
import {useFormik} from "formik"
import {registerSchema} from "/src/schemas"
import Swal from "sweetalert2";  
import {useNavigate} from 'react-router-dom';
import backgroundImage from "/src/assets/auth.png";

const SignUp = () => {

    const navigate = useNavigate();

    const navigateToLogIn = () => {
      
      navigate('/login');
    };
  

    const [rentingPlace, setRentingPlace] = React.useState(false);
  
    const handleRentingPlaceToggle = () => {
        setRentingPlace(!rentingPlace);
    };
  

  const onSubmit = (values, actions) =>{

    let title = "\n"
    if (rentingPlace === true)
        title = "\nThank you for your interest in renting a place. Your application will be reviewed."
    Swal.fire({
        title: 'Welcome '+values.Username +'!' + title,
        text: '',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
          /* Navigate previous paths */
      });


  };

  const {values, errors,isSubmitting, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:{
        email:"",
        password:"",
        passwordConfirmation:"",
        Username:"",
        FirstName:"",
        LastName:"",
        PhoneNumber:"",
        Address:"",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (


    
    <section className="bg-white ">
        <div className="flex justify-center min-h-screen">
            <div className="hidden bg-no-repeat  lg:block lg:w-2/5 bg-center"  style={{ backgroundImage: `url(${backgroundImage})` }}>
            </div>
    
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 ">
                <div className="w-full">
                    <h1 className="txt-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                        {signup.title}
                    </h1>
    
                    <p className="mt-4 text-gray-500 ">
                        {signup.description}
                    </p>
    
                    <div className="mt-6">
                    <h1 className="text-gray-500 ">{signup.selectAccountType}</h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2">
                    <label className="flex justify-center items-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                        <input type="checkbox" name="accountType" value="lookingForPlace" checked className="hidden"/>
                        <FiSearch/>
                        <span className="mx-2">
                            {signup.lookingForPlace}
                        </span>
                    </label>

                    <label 
                        className={( rentingPlace === true ?   "text-white bg-blue-500 hover:bg-blue-400 " : "text-blue-500 border border-blue-500 hover:border-blue-400 hover:text-blue-400 ")+ 
                        " flex justify-center items-center w-full   px-6 py-3 mt-4rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none"}
                            >
                        <input type="checkbox" name="accountType" value="rentingOutPlace" className="hidden" onClick={() => handleRentingPlaceToggle()}/>
                          <GoHome/>
                        <span className="mx-2">
                            {signup.rentingOutPlace}
                        </span>
                    </label>
                </div>
                    </div>
    
                    <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.usernameLabel}</label>
                            <input 
                                id = "Username"
                                value={values.Username}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                type="text" 
                                placeholder={signup.usernamePlaceholder} 
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.Username && touched.Username && <p className = "text-red-700 text-sm">{errors.Username}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.emailLabel}</label>
                            <input 
                              id = "email"
                              value={values.email}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              type="email" placeholder={signup.emailPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                              {errors.email && touched.email && <p className = "text-red-700 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.firstNameLabel}</label>
                            <input 
                                id = "FirstName"
                                value={values.FirstName}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                type="text" 
                                placeholder={signup.firstNamePlaceholder} 
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.FirstName && touched.FirstName && <p className = "text-red-700 text-sm">{errors.FirstName}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.lastNameLabel}</label>
                            <input  
                                id = "LastName"
                                value={values.LastName}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                type="text" 
                                placeholder={signup.lastNameLabelPlaceholder} 
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.LastName && touched.LastName && <p className = "text-red-700 text-sm">{errors.LastName}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.phoneNumber}</label>
                            <input 
                                id = "PhoneNumber"
                                value={values.PhoneNumber}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                type="text" 
                                placeholder={signup.phoneNumberPlaceholder}  
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                 {errors.PhoneNumber && touched.PhoneNumber && <p className = "text-red-700 text-sm">{errors.PhoneNumber}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.address}</label>
                            <input 
                                id = "Address"
                                value={values.Address}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                type="text" 
                                placeholder={signup.addressPlaceholder}  
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.Address && touched.Address && <p className = "text-red-700 text-sm">{errors.Address}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 ">{signup.password}</label>
                            <input 
                              value={values.password}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              type="password"
                              id="password"
                              placeholder={signup.passwordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                              {errors.password && touched.password && <p className = "text-red-700 text-sm">{errors.password}</p>}
                        </div>
    
                        <div>
                            <label className={"block mb-2 text-sm text-gray-600 " +
                              (errors.passwordConfirmation && touched.passwordConfirmation? "border-red-700":"border-gray-300")}>
                                {signup.confirmPassword}
                            </label>
                            <input 
                              id="passwordConfirmation"
                              value={values.passwordConfirmation}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              type="password"
                              placeholder={signup.confirmPasswordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                              {errors.passwordConfirmation && touched.passwordConfirmation && <p className = "text-red-700 text-sm">{errors.passwordConfirmation}</p>}
                        </div>
    
                        <button
                            className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            type = "submit">
                            <span>{signup.submitButtonLabel}</span>
    
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <p className='pt-3'>Already have an account? &nbsp;
                        <button className='underline text-blue-500' onClick={navigateToLogIn}><span >{signup.loginButtonLabel}</span></button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

  )
}

export default SignUp