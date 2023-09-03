// constants.js
export const signup = {
  title: 'Get your free account now.',
  description:
    "Let’s get you all set up so you can verify your personal account and begin setting up your profile.",
  selectAccountType: 'Select type of account',
  lookingForPlace: 'Looking for a place to rent',
  rentingOutPlace: 'Renting out a place',
  usernameLabel: 'Username',
  emailLabel: 'Email address',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  phoneNumber: 'Phone number',
  address: 'Address',
  password: 'Password',
  confirmPassword: 'Confirm password',
  usernamePlaceholder: 'John123',
  emailPlaceholder: 'johnsnow@example.com',
  firstNamePlaceholder: 'John',
  lastNameLabelPlaceholder: 'Snow',
  phoneNumberPlaceholder: 'XXX-XX-XXXX-XXX',
  addressPlaceholder: 'Greece, Athens',
  passwordPlaceholder: 'Enter your password',
  confirmPasswordPlaceholder: 'Enter your password',

  submitButtonLabel: 'Sign up',
  loginButtonLabel: 'Log in',
};

export const editProfileInfo = {
  title: 'Edit Your Profile',
  description: "Update your details and ensure your profile is up-to-date.",
};

export const login = {
  title: 'Welcome to RentSpot',
  description:
    "Let’s get you all set up so you can verify your personal account and begin setting up your profile.",
  emailLabel: 'Email address',
  password: 'Password',
  emailPlaceholder: 'johnsnow@example.com',
  passwordPlaceholder: 'Enter your password',
  
  loginButtonLabel: 'Log in',
  signupButtonLabel: 'Sign up!',
  submitButtonLabel: 'Don\'t have an account? Sign up',
};

import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaParking, FaSwimmingPool } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai"
import { TbAirConditioning, TbToolsKitchen2 } from "react-icons/tb"
import { FiMonitor } from "react-icons/fi"
import { MdElevator } from "react-icons/md"

export const filterCategories = {
  location: {
    label: "Location",
    Icon : <FaMapMarkerAlt />
  },
  arrive: {
    label: "Date",
    Icon: <FaCalendarAlt />
  },
  persons: {
    label: "Persons",
    Icon: <FaUsers />
  },
};


export const filterCategories2 = {
  maxPrice: {
    label: "Max Price",
  },
  roomType: {
    label: "Room Type",
    options:{
      entire_home: "Entire home/apt",
      private_room: "Private room",
      shared_room: "Shared room"
    }
  },
  amenities: {
    label: "Amenities",
    options: {
      wifi: "Wi-fi",
      airConditioning: "Air Conditioning",
      kitchen: "Kitchen",
      tv: "TV",
      parking: "Parking",
      elevator: "Elevator",
      pool: "pool",
    },
    icons: {
      wifi: <AiOutlineWifi />,
      airConditioning: <TbAirConditioning />,
      kitchen: <TbToolsKitchen2 />,
      tv: <FiMonitor />,
      parking: <FaParking />,
      elevator: <MdElevator />,
      pool: <FaSwimmingPool />,
    }
  },
};


export const adminSidebar = {
  title: "dashboard",
  description: "Data Overview",
  users: {
    title: "users",
    description: "Users Manager",
  },
  listings: {
    title: "listings",
    description: "Listings Overview",
  },
  bookings: {
    title: "bookings",
    description: "Bookings Overview",
  },
  reviews: {
    title: "reviews",
    description: "Reviews Overview",
  },
};
