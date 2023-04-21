import * as yup from "yup";

// Define a regular expression for password rules
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

// Set the language for error messages to Greek
yup.setLocale({
    mixed: {
        default: 'Invalid value',
        required: 'This field is required',
        oneOf: 'Must be one of {{values}}',
        notOneOf: 'Cannot be one of {{values}}',
    },
    string: {
        length: 'Must be {{length}} characters',
        min: 'Must be at least {{min}} characters',
        max: 'Must be at most {{max}} characters',
        email: 'Must be a valid email address',
        url: 'Must be a valid URL',
    },
});

// Define a schema for login form
const loginSchema = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email address")
        .required("This field is required"),
    password: yup.string()
        .test('password-rules', 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number', value => passwordRules.test(value))
        .required("This field is required"),
});

// Define a schema for registration form
const registerSchema = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email address")
        .required("This field is required"),
    password: yup.string()
        .test('password-rules', 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number', value => passwordRules.test(value))
        .required("This field is required"),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required("This field is required"),
    Username: yup.string()
        .required("This field is required"),
    FirstName: yup.string()
        .required("This field is required"),
    LastName: yup.string()
        .required("This field is required"),
    PhoneNumber: yup.string()
        .required("This field is required"),
    Address: yup.string()
        .required("This field is required"),
});

export { loginSchema, registerSchema };
