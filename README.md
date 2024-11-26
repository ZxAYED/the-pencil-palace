The-Pencil-Palace
A backend API for managing stationery products and orders, built with Node.js, Express, TypeScript, MongoDB, and enhanced with Prettier and ESLint for code formatting and linting.

Features
Product Management
Add Products: Create stationery items with detailed attributes.

Retrieve Products:
Fetch all products or filter by name, brand, or category using query parameters.
Retrieve a specific product by its ID.

Update Products: Modify existing product details.

Delete Products: Remove stationery items from the database.
Order Management

Place Orders:
Automatically adjust inventory based on the order quantity.
Handle out-of-stock scenarios with meaningful error messages.

Revenue Calculation:
Use MongoDB aggregation to calculate the total revenue from all orders.

Error Handling
Input Validation: Uses Zod for strict schema validation.
Custom Error Responses: Detailed and descriptive error messages.

Code Quality
Prettier: Ensures consistent code formatting.
ESLint: Enforces coding standards and best practices.
Modular Design: Clean and scalable project structure.
Technologies Used
Node.js: JavaScript runtime environment.
Express: Lightweight web framework for building RESTful APIs.
TypeScript: Superset of JavaScript for static typing.
MongoDB: NoSQL database for storing product and order data.
Mongoose: ODM for MongoDB.
Zod: Runtime schema validation.
Prettier: Code formatter.
ESLint: Linter for identifying and fixing coding issues.
Project Structure

Copy code
The-Pencil-Palace/
├── src/
│ ├── config/
│ │ └── index.ts # Handles environment variable configuration
│ ├── features/
│ │ ├── products/ # Product-related features
│ │ │ ├── controller/ # Product controllers
│ │ │ ├── models/ # Product Mongoose schemas
│ │ │ ├── interface/ # Product TypeScript interfaces
│ │ │ └── router.ts # Product routes
│ │ │ └── validation.ts # Product validation using zod
│ │ ├── orders/ # Order-related features
│ │ │ ├── controller/ # Order controllers
│ │ │ ├── models/ # Order Mongoose schemas
│ │ │ ├── interface/ # Order TypeScript interfaces
│ │ │ └── router.ts # Order routes
│ ├── app.ts # Express app setup
│ ├── server.ts # Application entry point
├── .eslintrc.json # ESLint configuration
├── .prettierrc # Prettier configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
├── README.md # Documentation
├── .env # Environment variables
Getting Started
Prerequisites
Ensure the following are installed:

Node.js (v14 or later)
npm or yarn
MongoDB (local or remote instance)

1. Clone the Repository
   bash
   Copy code
   git clone https://github.com/ZxAYED/the-pencil-palace.git
   cd the-pencil-palace

2. Install Dependencies
   Run:
   bash
   Copy code
   npm install

3. Setup Environment Variables
   Create a .env file in the root directory:
   env
   Copy code
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stationery-shop
   NODE_ENV=development
   OR this is the production api , You can use it directly in your app -
   https://github.com/ZxAYED/the-pencil-palace

4. Start the Application
   For development:
   bash
   Copy code
   npm run dev
   The server will run at http://localhost:5000.

API Endpoints
Product Endpoints
Create Product: POST /api/products
Get All Products: GET /api/products
Get Product by ID: GET /api/products/:productId
Update Product: PUT /api/products/:productId
Delete Product: DELETE /api/products/:productId
Order Endpoints
Place an Order: POST /api/orders
Calculate Revenue: GET /api/orders/revenue
Code Quality
Prettier
Prettier ensures consistent code formatting. The configuration is in .prettierrc.

Run Prettier manually:
bash
Copy code
npx prettier --write .
ESLint
ESLint identifies and fixes coding issues. The configuration is in .eslintrc.json.

Run ESLint:
bash
Copy code
npx eslint .

To fix issues automatically:
bash
Copy code
npx eslint . --fix
Testing

You can use Postman or similar tools to test the API. Example requests are listed under API Endpoints.

Contributing
Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit your changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Submit a pull request.

Contact
For queries or contributions, reach out at zzayediqbalofficial@gmail.com
