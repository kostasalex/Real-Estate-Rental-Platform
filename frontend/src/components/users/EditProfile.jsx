import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '/src/assets/editProfile.jpg';
import { UploadPhotos } from '/src/components';
import useCloudinaryUpload from '/src/hooks/useCloudinaryUpload';
import { profileEditSchema } from '/src/schemas';
import { signup, editProfileInfo } from '/src/assets/constants';

const EditProfile = (props) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('loggedInUserId'))
    const [isPasswordChangeEnabled, setPasswordChangeEnabled] = useState(false);
    const { uploadedUrl, handleUpload } = useCloudinaryUpload();
    const [photo, setPhoto] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch(`https://localhost:8443/api/v1/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                if (data.image_url) {
                    setPhoto([data.image_url]); // Convert to array if image_url is a string
                } else {
                    setPhoto([]);
                }
            })
            .catch((error) => console.error(error));
    }, []);
    
    const hasDataChanged = (values) => {
        const emailChanged = values.email !== user.email;
        const firstNameChanged = values.first_name !== user.firstName;
        const lastNameChanged = values.last_name !== user.lastName;
        const phoneNumberChanged = values.phone_number !== user.phoneNumber;
        const addressChanged = values.address !== user.address;
        const photoChanged = photo[0] !== user.image_url; // Assuming photo is an array, so we take the first element
        const passwordChanged = isPasswordChangeEnabled && values.password; // If password change is enabled and there's a new password
    
        return emailChanged || firstNameChanged || lastNameChanged || phoneNumberChanged || addressChanged || photoChanged || passwordChanged;
    }

    
    const onSubmit = async (values, actions) => {

        if (!hasDataChanged(values)) {
            Swal.fire({
                title: 'No Changes Detected',
                text: "You haven't made any changes.",
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let uploadedImageUrl = null
                console.log(photo)
                if(photo && photo.length > 0){
                    if (photo[0] !== user.image_url) {
                        uploadedImageUrl = await handleUpload(photo);
                    } else {
                        uploadedImageUrl = user.image_url;
                    }
                }
                
                
                try {
                    
                    let requestBody = {
                        email: values.email,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        phone_number: values.phone_number,
                        address: values.address,
                        image_url: uploadedImageUrl,
                    };
    
                    // If the change password toggle is enabled, add the password to the request body
                    if (isPasswordChangeEnabled) {
                        requestBody.password = values.password;
                    }
                    const response = await fetch(`https://localhost:8443/api/v1/users/${userId}/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    });
    
                    if (response.ok) {
                        Swal.fire({
                            title: 'Profile Updated!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            timer: 3000
                        });

                        //Change the data saved in the local storage for the logged in user.
                        const userData = {
                            id: userId, 
                            firstName: values.first_name,
                            userType: localStorage.getItem('loggedInUserType'),
                            email: values.email
                            };
                        props.handleLogin(userData);

                        navigate('/');
            
                    } else {
                        const errorMessage = await response.json();
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
            }
        });
    };
    
    

    const handleCancel = () => {
        resetForm()
        if (user.image_url) {
            setPhoto([user.image_url]); // Convert to array if image_url is a string
        } else {
            setPhoto([]);
        }
        setPasswordChangeEnabled(false);
      };

      const formik = useFormik({
        initialValues: {
            email: user.email || '',
            password: '',
            passwordConfirmation: '',
            first_name: user.firstName || '',
            last_name: user.lastName || '',
            phone_number: user.phoneNumber || '',
            address: user.address || '',
            profileEditSchema,
        },
        validationSchema: () => profileEditSchema(isPasswordChangeEnabled),
        onSubmit,
        enableReinitialize: true  // Add this line
    });
    const { values, errors, isSubmitting, touched, handleBlur, handleChange, handleSubmit, resetForm } = formik;

    return (
        <section className="bg-transparent ">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-no-repeat lg:block lg:w-2/5 bg-center z-10" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 z-0">
                    <div className="w-full">
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="txt-3xl font-semibold tracking-wider  text-gray-800 capitalize ">{editProfileInfo.title}</h1>

                            <p className="mt-4 text-gray-500 ">{editProfileInfo.description}</p>
                        </div>
                        <div className='flex justify-center border-t-2 mt-6'>
                            <UploadPhotos
                                        photos={photo}
                                        setPhotos={setPhoto}
                                        numOfPhotos = {1}
                                        title = "Change Profile Picture"
                                />
                        </div>


                        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 " onSubmit={handleSubmit}>
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
                        </div>
                        <div className="flex flex-col items-center border-t-2 justify-center mt-7 p-4">
                            
                            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                                <input 
                                    type="checkbox" 
                                    name="toggle" 
                                    id="toggle" 
                                    checked={isPasswordChangeEnabled} 
                                    onChange={() => setPasswordChangeEnabled(!isPasswordChangeEnabled)} 
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none"
                                    style={{ left: isPasswordChangeEnabled ? '1.25rem' : '0rem' }} 
                                />
                                <label 
                                    htmlFor="toggle" 
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isPasswordChangeEnabled ? 'bg-blue-400' : 'bg-gray-300'}`}
                                ></label>
                            </div>
                            <label htmlFor="toggle" className="ml-3 text-gray-700">
                                Change Password
                            </label>
                            {isPasswordChangeEnabled && (
                            <div className='flex flex-col  mt-10  space-y-4 '>
                                <div className=' flex flex-col justify-center '>
                                    <label className="block text-sm text-gray-600 ">New Password</label>
                                    <input
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="password"
                                        id="password"
                                        placeholder={signup.passwordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        {errors.password && touched.password && <p className="text-red-700 text-sm">{errors.password}</p>}
                                </div>

                                <div className=' flex flex-col '>
                                    <label className={"block  text-sm text-gray-600 " +
                                        (errors.passwordConfirmation && touched.passwordConfirmation ? "border-red-700" : "border-gray-300")}>
                                        Confirm New Password
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
                            </div>)}
                            <div className=' flex flex-row mt-10 space-x-10 pt-10 justify-center items-center'>
                                <div onClick={handleCancel}>
                                    <div
                                        className="flex items-center cursor-pointer justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        >
                                        <span>Cancel changes</span>


                                    </div>
                                </div>
                    
                                <div>
                                    <button
                                        className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                        onClick={handleSubmit}>
                                        <span>Save changes</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProfile;
