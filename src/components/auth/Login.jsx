import React from 'react'
import { login } from '/src/assets/constants'
import {useFormik} from "formik"
import {loginSchema} from "/src/schemas"
import Swal from "sweetalert2";  


const Login = () => {

  function MyButton() {
    const history = useHistory();
  
    const handleClick = () => {
      history.push('/signup');
    };
  
    return (
      <button onClick={handleClick}>Go to New Page</button>
    );
  }
  
  const onSubmit = (values, actions) =>{


    Swal.fire({
        title: 'Welcome to Airbnb',
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

    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (


    
    <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage: `url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')`}}>
            </div>
    
            <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                <div className="w-full">
                    <h1 className="txt-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                        {login.title}
                    </h1>
    
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        {login.description}
                    </p>
    
    
                    <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">{login.emailLabel}</label>
                            <input 
                              id = "email"
                              value={values.email}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              type="email" placeholder={login.emailPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                              {errors.email && touched.email && <p className = "text-red-700 text-sm">{errors.email}</p>}
                        </div>
    
                        <div>
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">{login.password}</label>
                            <input 
                              value={values.password}
                              onChange = {handleChange}
                              onBlur = {handleBlur}
                              type="password"
                              id="password"
                              placeholder={login.passwordPlaceholder} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                              {errors.password && touched.password && <p className = "text-red-700 text-sm">{errors.password}</p>}
                        </div>
                            <button
                            className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            type = "submit">
                            <span>{login.loginButtonLabel}</span>
    
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

  )
}

export default Login