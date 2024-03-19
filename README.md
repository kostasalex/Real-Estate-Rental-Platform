# Real Estate Rental Platform


## Description
This project is a clone of Airbnb, facilitating property rentals between hosts and seekers. It's built with React and Tailwind CSS for the frontend, Java Spring Boot for the backend, and MySQL for the database.


## Features
- Property listings with pagination
- User roles: Admin, Host, Seeker, Anonymous
- Registration and login system
- Property search with filters
- Profile editing
- Messaging system
- Recommendation system for properties


## Installation

### Prerequisites
- Node.js (v18.12.0)
- npm (v9.5.1)
- Java JDK (v17.0.7)
- Apache Maven (v3.9.2)
- MySQL (v8.0+)

### Setup Instructions

#### Frontend setup:
Navigate to the frontend directory:
- npm install
- npm run dev

### Backend setup:
Navigate to the backend directory:
- mvn clean install
- mvn spring-boot:run

### Database setup:
Use MySQL Workbench to setup a new connection with the provided credentials and run the provided SQL script.


## Roles and Permissions
- Anonymous: Browse properties
- Seeker: All anonymous permissions + booking, viewing host profiles
- Host: All seeker permissions + create and manage listings
- Admin: Full platform access and control


## Technologies Used
- Frontend: React (v17.0+), Tailwind CSS
- Backend: Java Spring Boot (v2.4+)
- Database: MySQL (v8.0+)


## External APIs and Tools

### Cloudinary
For image hosting, including user profile images and property photos, we integrate Cloudinary. To use this feature:

1. Register at [Cloudinary's website](https://cloudinary.com/) to obtain your API key and secret key.
2. Add the keys to an .env file in the respective backend directory (backend/src/main/resources/).

### OpenStreetMap
OpenStreetMap is utilized for mapping functionalities, enabling users to view property locations accurately.


## Future Work
As we look toward the future of this project, several areas present opportunities for improvement and further development. These include:

- Enhancing the Recommendation System: We plan to refine the complexity and accuracy of the recommendation system to better match users with listings.
- Query Optimization: Optimizing queries for fetching listings to improve performance and user experience.
- Security Enhancements: Strengthening security measures, including encrypted passwords and restricted access to backend endpoints, to ensure user data protection.
- Improved Responsiveness and Styling: We aim to enhance the responsiveness and visual appeal of the platform across different devices and screen sizes.
- Docker Integration: Implementing better bundling and portability using Docker to facilitate easier deployment and scalability.
- Code Refactoring: We will work on code refactoring for better abstraction and modularization. This involves breaking down the code into smaller, reusable components to improve maintainability and scalability.
- Code Documentation: Increasing the amount of comments within the codebase to improve readability and ease of navigation for new contributors.
- Backend Refactoring: Refactoring the backend to faithfully follow the [Onion Architecture](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423), enhancing the separation of concerns and making the system more resilient to changes.
- These initiatives will guide our efforts as we continue to evolve and refine the platform, ensuring it remains robust, user-friendly, and secure.



