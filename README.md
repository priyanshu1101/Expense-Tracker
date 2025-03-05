# Expense Tracker

A web-based expense tracking application that helps users manage and monitor their expenses effectively. The application allows users to add, view, and analyze their expenses with an intuitive interface.

Live Demo: [Expense Tracker](https://expense-tracker-igkb.onrender.com/total-expenses)

## Features

- 💰 Track and manage expenses
- 📊 View expense statistics and summaries
- 🗂️ Categorize expenses
- 📅 Filter expenses by date range
- 📱 Responsive design for mobile and desktop
- 📈 Visual representation of expense data
- 🔄 Real-time updates

## Tech Stack

- Frontend:
  - React.js
  - Material-UI
  - Chart.js for data visualization
  
- Backend:
  - Node.js
  - Express.js
  - MongoDB for database

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation & Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install all dependencies (both backend and frontend):
```bash
npm run server
```
This command will:
- Install backend dependencies
- Navigate to frontend directory
- Install frontend dependencies
- Build the frontend application

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the application:
```bash
npm run start
```

The application will be running on `http://localhost:5000`

## Usage

1. Add new expenses using the "Add Expense" button
2. View your expense history in the dashboard
3. Filter expenses by date range
4. Analyze expense patterns through visual charts
5. View total expenses and category-wise breakdowns

## API Endpoints

- `GET /total-expenses` - Get all expenses
- `POST /add-expense` - Add a new expense
- `GET /expenses-by-date` - Get expenses filtered by date
- `DELETE /delete-expense/:id` - Delete an expense

## Project Structure


```
expense-tracker/
├── backend/
│ ├── src/
│ ├── package.json
│ └── .env
└── frontend/
├── src/
├── public/
└── package.json
```

## Troubleshooting

- If you encounter CORS issues, make sure the server is running properly
- Check MongoDB connection if data is not being saved
- Ensure all environment variables are properly set in the `.env` file
- If you encounter any dependency issues during installation, try running `npm run server` again
