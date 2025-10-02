# agile-talents-test

Installation and Startup To get the project up and running locally, follow these steps.

Clone the repository First, clone the project from GitHub and navigate to the project root directory.

git clone https://github.com/svbarytskiy/agile-talents-test

cd agile-talents-test

Install dependencies This project is a monorepo with shared dependencies. Install all dependencies for the backend and frontend. Install shared dependencies (ESLint, Husky, etc.):

npm install

Install backend dependencies:

cd server npm install

Install client dependencies:

cd ../client npm install

Configure environment variables You need to set up environment variables for both the backend and frontend. Create a .env file in each of the respective folders.

Backend .env (in the server folder):

PORT=5000

Client .env (in the client folder):

VITE_API_URL=http://localhost:5000/api

Run the application You need to run both the backend and frontend servers in separate terminal windows. Start the backend (in the server folder):

npm run dev

Start the client (in the client folder):

npm run dev

The backend server will be available at http://localhost:5000, and the client application will be running on http://localhost:5173

Architecture
React, TypeScript, Vite Utilizes TypeScript.
Styling: Tailwind CSS, Shadcn UI.
State Management: Context API.
Routing: React Router DOM.
Forms: React Hook Form, Zod.
