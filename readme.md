# 🐵 MonkeyType Clone - Typing Insights

## 🚀 Project Overview
This is a **full-stack MERN** application that replicates **MonkeyType**, allowing users to take a timed typing test (15s/30s) and receive **performance insights** based on their typing data. The application tracks **WPM (Words Per Minute), accuracy, and errors**, stores session data in MongoDB, and analyzes error patterns & typing behavior.

## 📌 Features
### ✅ Core Typing Test Functionality (Frontend - React.js)
- Users can take a **15s or 30s typing test** in long-paragraph mode.
- Real-time **WPM and accuracy tracking**.
- **Error highlighting** for incorrect keystrokes.
- Timer countdown that **auto-ends the session**.

### ✅ Backend API & Data Storage (Node.js, Express, MongoDB)
- **User Authentication (JWT-based)**
  - `POST /api/auth/signup` → Register a new user.
  - `POST /api/auth/login` → Authenticate user & issue a token.
  - `GET /api/auth/user` → Retrieve user details (requires authentication).
- **Typing Session Management**
  - `POST /api/sessions` → Store completed typing session data.
  - `GET /api/sessions/:userId` → Retrieve past typing session history.
  - `GET /api/analysis/:sessionId` → Analyze typing errors & patterns.
- **MongoDB Schema (Typing Session)**
  ```js
  const sessionSchema = new mongoose.Schema({
    userId: String,
    wpm: Number,
    accuracy: Number,
    totalErrors: Number,
    errorWords: [String],
    typingDurations: [Number], // Time taken per word
    createdAt: { type: Date, default: Date.now }
  });
  ```

### 🔍 (Bonus) Error & Pattern Analysis
- Identify **frequently misspelled words**.
- Detect **pauses before difficult words**.
- Track **typing speed variation after mistakes**.

### 🧠 (Bonus) Psychological Insights
- **Impulsivity vs. Deliberation** – Do users type fast with errors or slowly with accuracy?
- **Cognitive Load Capacity** – Do they struggle with long words?
- **Resilience & Recovery** – Do errors significantly slow them down?
- **Anxiety Under Pressure** – Does the countdown timer affect performance?

## 🛠️ Tech Stack
### **Frontend:** React.js, Tailwind CSS
### **Backend:** Node.js, Express.js, MongoDB, Mongoose
### **Authentication:** JWT-based authentication
### **Deployment:** Vercel (Frontend), Render(Backend)

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/monkeytype-clone.git
cd monkeytype-clone
```

### 2️⃣ Install Dependencies
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `server` directory and add:
```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
```

### 4️⃣ Run the Application
```sh
# Start the backend server
cd server
npm start

# Start the frontend
cd ../client
npm start
```
The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## 📌 Deployment
### **Frontend Deployment (Vercel)**
```sh
npm install -g vercel
vercel
```

### **Backend Deployment (Render/Heroku)**
```sh
git push heroku main
```

## 📜 Submission Guidelines
- Upload the project to a **public GitHub repository**.
- Include this `README.md` with proper setup instructions

## 👨‍💻 Author
- **Ritesh Agrahari** ([GitHub](https://github.com/ritesh25033))

---
🚀 **Happy Coding!** 🎯

