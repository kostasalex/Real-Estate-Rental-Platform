import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '/src/assets/auth.png';
import { BsFillKeyFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { signup } from '/src/assets/constants';
import { registerSchema } from '/src/schemas';
import { UploadPhotos } from '/src/components';
import useCloudinaryUpload from '/src/hooks/useCloudinaryUpload';

const SignUp = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const toggle = location?.state?.toggle || false;

    const navigateToLogIn = () => {
        navigate('/login');
    };
	const { uploadedUrl, handleUpload } = useCloudinaryUpload();
    const [rentingPlace, setRentingPlace] = useState(toggle);
    const [userType, setUserType] = useState(rentingPlace === false ? "Seeker" : "PendingHost");
    const [hostApplication, setHostApplication] = useState(rentingPlace === false ? 0 : 1);
	const [photo, setPhoto] = useState([]);

    const handleRentingPlaceToggle = () => {
        setRentingPlace(!rentingPlace);
    };

    useEffect(() => {
        setUserType(rentingPlace === false ? "Seeker" : "PendingHost");
      }, [rentingPlace]);

      useEffect(() => {
        setHostApplication(rentingPlace === false ? 0 : 1);
      }, [userType]);

    const onSubmit = async (values, actions) => {
    let msg = '';
    if (rentingPlace === true) {
        msg = '\nHost Application Received. We will notify you as soon as it is approved.';
    }
    values.host_application = hostApplication;
    
    let uploadedImageUrl = photo.length > 0 ? await handleUpload(photo[0]) : null
    const visitedListings = JSON.parse(localStorage.getItem('visitedListings')) || [];

    try {
        const requestBody = {
            ...values,
            image_url : uploadedImageUrl,
            visited_listings: visitedListings,
        };
        // Send the form data to the backend and handle the response
        const response = await fetch('https://localhost:8443/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            localStorage.removeItem('visitedListings'); // Clear the visited listings for the user after storing in the database
            const data = await response.json(); // Parse the response as JSON
            const userId = data.id; // Access the ID from the response
            navigate(location.state?.from || '/');
            Swal.fire({
                title: 'Welcome ' + values.first_name + '!',
                text: msg,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            }).then(() => {
                /* Navigate previous paths */
                const userData = {
                id: userId, // Use the correct ID here
                firstName: values.first_name,
                userType: userType,
                email: values.email
                };

                props.handleLogin(userData);
        });
        } else {
            const errorMessage = await response.json(); // Parse the error message as JSON
            Swal.fire({
            title: 'Error',
            text: errorMessage.error,
            icon: 'error',
            confirmButtonText: 'OK',
            showCloseButton: true
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
        title: 'Error',
        text: 'An error occurred while processing your request.',
        icon: 'error',
        confirmButtonText: 'OK'
        });
    }
    };
    
    

    const handleAdmin = () => {
        let userType = 'Admin';
        const userData = {
            id: values.id,
            firstName: values.first_name,
            userType: userType,
            email: values.email
          };
        props.handleLogin(userData);
        navigate('/');
    };

    const { values, errors, isSubmitting, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: signup.emailPlaceholder,
            password: 'ASD1a',
            passwordConfirmation: 'ASD1a',
            Username: signup.usernamePlaceholder,
            first_name: signup.firstNamePlaceholder,
            last_name: signup.lastNameLabelPlaceholder,
            phone_number: '699000000',
            address: signup.addressPlaceholder,
            host_application: hostApplication,
        },
        validationSchema: registerSchema,
        onSubmit
    });

    return (
        <section className="bg-white ">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-no-repeat lg:block lg:w-2/5 bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 ">
                    <div className="w-full">
                        <h1 className="txt-2xl font-semibold tracking-wider text-gray-800 capitalize ">{signup.title}</h1>

                        <p className="mt-4 text-gray-500 ">{signup.description}</p>

                        <div className="mt-6">
                            <h1 className="text-gray-500 ">{signup.selectAccountType}</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button
                                    className="flex justify-center items-center w-full px-6 py-3 text-white bg-orange-500 hover:bg-orange-400 hover:shadow-xl rounded-md md:w-auto md:mx-2 focus:outline-none"
                                    onClick={() => handleAdmin()}
                                >
                                    <BsFillKeyFill />
                                    <span className="mx-2">Admin</span>
                                </button>

                                <label className="flex justify-center items-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                                    <input type="checkbox" name="accountType" value="lookingForPlace" checked className="hidden" />
                                    <FiSearch />
                                    <span className="mx-2">
                                        {signup.lookingForPlace}
                                    </span>
                                </label>

                                <label
                                    className={(rentingPlace === true ? "text-white bg-blue-500 hover:bg-blue-400 " : "text-blue-500 border border-blue-500 hover:border-blue-400 hover:text-blue-400 ") +
                                        " flex justify-center items-center w-full   px-6 py-3 mt-4rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none"}
                                >
                                    <input type="checkbox" name="accountType" value="rentingOutPlace" className="hidden" onClick={() => handleRentingPlaceToggle()} />
                                    <GoHome />
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
                                    id="Username"
                                    value={values.Username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder={signup.usernamePlaceholder}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.Username && touched.Username && <p className="text-red-700 text-sm">{errors.Username}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.emailLabel}</label>
                                <input
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="email" placeholder={signup.emailPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.email && touched.email && <p className="text-red-700 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.firstNameLabel}</label>
                                <input
                                    id="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder={signup.firstNamePlaceholder}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.first_name && touched.first_name && <p className="text-red-700 text-sm">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.lastNameLabel}</label>
                                <input
                                    id="last_name"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder={signup.lastNameLabelPlaceholder}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.last_name && touched.last_name && <p className="text-red-700 text-sm">{errors.last_name}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.phoneNumber}</label>
                                <input
                                    id="phone_number"
                                    value={values.phone_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder={signup.phoneNumberPlaceholder}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.phone_number && touched.phone_number && <p className="text-red-700 text-sm">{errors.phone_number}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.address}</label>
                                <input
                                    id="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="text"
                                    placeholder={signup.addressPlaceholder}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.address && touched.address && <p className="text-red-700 text-sm">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">{signup.password}</label>
                                <input
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="password"
                                    id="password"
                                    placeholder={signup.passwordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.password && touched.password && <p className="text-red-700 text-sm">{errors.password}</p>}
                            </div>

                            <div>
                                <label className={"block mb-2 text-sm text-gray-600 " +
                                    (errors.passwordConfirmation && touched.passwordConfirmation ? "border-red-700" : "border-gray-300")}>
                                    {signup.confirmPassword}
                                </label>
                                <input
                                    id="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="password"
                                    placeholder={signup.confirmPasswordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                {errors.passwordConfirmation && touched.passwordConfirmation && <p className="text-red-700 text-sm">{errors.passwordConfirmation}</p>}
                            </div>
                            <UploadPhotos
                                    photos={photo}
                                    setPhotos={setPhoto}
                                    numOfPhotos = {1}
                            />
                            <div className='mt-28'>
                                <button
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type="submit">
                                    <span>{signup.submitButtonLabel}</span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

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

export default SignUp;
