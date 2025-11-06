# FASHIONAPP
capstone Project 
AI Fashion Assistant – Backend
This backend is built with Node.js, Express, and MongoDB.
It provides the core APIs and database connection for the AI Fashion Assistant app.
🚀 Features
RESTful API structure using Express
MongoDB integration using Mongoose
Environment-based configuration
Scalable folder structure for adding routes and models easily
Error-handling middleware and JSON parsing support
🛠️ Tech Stack
Component	Technology
Runtime	Node.js
Framework	Express.js
Database	MongoDB (Mongoose ODM)
Environment	dotenv
Development	nodemon
📁 Folder Structure
backend/
│
├── models/            # Database schemas (e.g. User.js, Outfit.js)
├── routes/            # Express route handlers (e.g. userRoutes.js)
├── server.js          # Main entry point
├── package.json
└── .env               # Environment variables (not committed)
⚙️ Setup Instructions
1. Clone the project
git clone https://github.com/yourusername/ai-fashion-backend.git
cd ai-fashion-backend
2. Install dependencies
npm install
3. Create .env file
Create a .env file in the root directory and add:
MONGO_URI=mongodb://127.0.0.1:27017/aiFashionDB
PORT=5000
4. Start the server
npm start
or (for live reload during development):
npx nodemon server.js
🧩 Example Route
A simple health-check route to verify the backend is working:
app.get("/", (req, res) => {
  res.send("AI Fashion Backend is running 🚀");
});
Visit:
👉 http://localhost:5000/
🧪 Testing with Postman
You can test endpoints like this:
Open Postman
Create a new GET request
Enter: http://localhost:5000/
Click Send — you should see a success message.
