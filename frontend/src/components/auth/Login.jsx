import React from 'react';
import { login } from '/src/assets/constants';
import { useFormik } from 'formik';
import { loginSchema } from '/src/schemas';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '/src/assets/auth.png';

const Login = (props) => {
	const location = useLocation();
	const navigate = useNavigate();

	const navigateToSignUp = () => {
		navigate('/signup');
	};

	const onSubmit = async (values, actions) => {
		// Check if the user is trying to log in as an admin
		if (values.email === 'admin@example.com' && values.password === 'Admin1234') {
			// Admin login credentials, perform admin login
			handleAdmin();
		} else {
			// Attempt a regular user login
			try {
				const response = await fetch('https://localhost:8443/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					// User login successful
					const userData = await response.json();
					const userData2 = {
						...userData,
						email: values.email
					};
					//console.log(userData2);
					/* Navigate previous paths */
					props.handleLogin(userData2);
					navigate(location.state?.from || '/');
					Swal.fire({
						title: 'Welcome ' + userData2.firstName + '!',
						icon: 'success',
						confirmButtonText: 'OK',
						timer: 3000
					}).then(() => {

						props.handleLogin(userData);
					});
				} else if (response.status === 401) {
					// User not found or incorrect credentials
					Swal.fire({
						title: 'Login Failed',
						text: 'Invalid email or password',
						icon: 'error',
						confirmButtonText: 'OK',
						showCloseButton: true
					});
				} else {
					// Other server errors
					Swal.fire({
						title: 'Login Failed',
						text: 'An error occurred while logging in',
						icon: 'error',
						confirmButtonText: 'OK',
					});
				}
			} catch (error) {
				// Network or other error occurred
				console.error('Login error:', error);
				Swal.fire({
					title: 'Login Failed',
					text: 'An error occurred while logging in',
					icon: 'error',
					confirmButtonText: 'OK',
				});
			}
		}
	};

	const handleAdmin = () => {
		let userType = 'Admin';
		const userData = {
			id: 'admin_id', // You can set a unique ID for the admin
			firstName: 'Admin',
			userType: userType,
			email: 'admin@example.com',
		};
		props.handleLogin(userData);
		navigate('/');
	};

	const { values, errors, isSubmitting, touched, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: loginSchema,
		onSubmit,
	});

	return (
		<section className="bg-white ">
			<div className="flex justify-center min-h-screen">
				<div className="hidden bg-no-repeat lg:block lg:w-2/5 bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
				<div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
					<div className="w-full">
						<h1 className="txt-2xl font-semibold tracking-wider text-gray-800 capitalize ">{login.title}</h1>
						<p className="mt-4 text-gray-500 ">{login.description}</p>
						<form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
							<div>
								<label className="block mb-2 text-sm text-gray-600 ">{login.emailLabel}</label>
								<input
									id="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									type="email"
									placeholder={login.emailPlaceholder}
									className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
								/>
								{errors.email && touched.email && <p className="text-red-700 text-sm">{errors.email}</p>}
							</div>
							<div>
								<label className="block mb-2 text-sm text-gray-600 ">{login.password}</label>
								<input
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									type="password"
									id="password"
									placeholder={login.passwordPlaceholder}
									className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
								/>
							</div>
							<button
								className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
								type="submit"
							>
								<span>{login.loginButtonLabel}</span>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
									<path
										fillRule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<p className="pt-3">
								Don't have an account? &nbsp;
								<button className="underline text-blue-500" onClick={navigateToSignUp}>
									<span>{login.signupButtonLabel}</span>
								</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
