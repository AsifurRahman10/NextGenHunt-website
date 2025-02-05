# NextGen Hunt

**Live Site**: [NextGen Hunt](https://spectacular-praline-76df24.netlify.app/)  
**Server Side**: [NextGen Hunt Server](https://nextgenhunt-server.vercel.app/)

---

## Overview

NextGen Hunt is a platform where users can discover and share the latest technology, including web apps, AI tools, software, games, and mobile apps. It features role-based access (User, Moderator, Admin) and offers functionalities such as voting, reporting, product reviews, dashboard management, and coupon system integration. The site is fully responsive and provides a seamless user experience.

---

## Key Features

### Homepage

- **Featured Products**: Users can view products marked as "Featured" by the admin, check details, and vote for them.
- **Trending Technologies**: Displays the most-voted products. Clicking on a product takes users to the **Product Details** page (restricted to logged-in users).
- **Coupons Slider**: Showcases available coupons with their validity, allowing users to take advantage of discounts.

### Product Details Page

- Comprehensive product information, including description, reviews, ratings, and user votes.
- Options to vote for or report products.
- Users can write reviews and rate products.

### All Products Section

- Displays all products with pagination and a search feature (search by tags).

### Authentication

- **Login & Registration**: Users can sign up or log in using email/password or social media (Google).
- After login, users see their profile picture in the navbar with options to navigate to the **Dashboard** or **Sign Out**.

---

## User Roles

### User

- **My Profile**: View profile details. Free accounts can upgrade to premium via card payment and notify using nodemailer.
- **Add Product**: Submit a new product using a detailed form (premium users only).
- **My Products**: View all submitted products along with their status. Users can update or delete products. (Free users can submit only one product).
- **Voting & Reporting**: Can vote for and report products.

### Moderator

- **Product Review**: Review all submitted products by users. Moderators can accept, reject, or mark products as "Featured." Products must be approved before going live.
- **Reported Content**: View and manage all reported content. Moderators can delete products if necessary.

> **Moderator Credentials**
>
> - Email: moderator@gmail.com
> - Password: Moderator12345

### Admin

- **Statistics**: View insights such as total revenue, total products, pending products, and product status (via pie chart).
- **Manage Users**: Promote users to Moderator or Admin roles.
- **Manage Coupons**: Create, update, and delete discount coupons. These coupons can be used during premium account upgrades.

> **Admin Credentials**
>
> - Email: admin@gmail.com
> - Password: Admin12345

---

## Technology Stack

### Frontend

- React
- React Router
- React Hook Form
- Swiper
- Recharts
- Lottie
- Axios
- SweetAlert2
- Firebase Authentication
- nodemailer

### Backend

- Node.js
- Express.js

### Tools & Libraries

- Stripe
- React Helmet Async
- React DND
- React Icons
- TanStack React Query
- Moment.js

## Running the Project Locally

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/AsifurRahman10/NextGenHunt-website.git
cd NextGenHunt-website
2. Install Dependencies
Frontend
Navigate to the frontend folder and install the required dependencies:

bash
Copy
Edit
cd frontend
npm install
Backend
Navigate to the backend folder and install the required dependencies:

bash
Copy
Edit
cd backend
npm install
3. Setup Environment Variables
You need to create a .env file for both the frontend and backend with the necessary environment variables.

Frontend:
Firebase credentials
API keys for any other integrations (if needed)
Backend:
Create a .env file in the backend folder with the following variables:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
4. Run the Backend
Start the backend server by running the following command:

bash
Copy
Edit
cd backend
npm start
This will start the server on http://localhost:5000.

5. Run the Frontend
Start the frontend application by running:

bash
Copy
Edit
cd frontend
npm start
This will start the React app on http://localhost:3000.

6. Access the Application
Open your browser and go to http://localhost:3000 to see the app running locally.

vbnet
Copy
Edit

### Key Changes:
- Each section (like "Frontend" and "Backend") is clearly labeled with headings.
- Subsections and instructions are neatly arranged under each main heading.
- Step-by-step flow is maintained to ensure clarity.

This format will be much clearer and easier to follow for anyone using the `README.md`. Let me know if t
```
