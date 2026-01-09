# VirtuBox Assessment - Task Manager App

A responsive Task Management application with Authentication and real-time CRUD operations.

**Live Link:** [task-app-five-red-68.vercel.app](https://task-app-five-red-68.vercel.app/)

**Video Walkthrough:** [Click Here to Watch Demo](https://drive.google.com/file/d/1Sehy6in3CoXJuI0cG2bGKhH2gdoKFRmA/view?usp=sharing) 

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend (BaaS):** Firebase (Auth & Firestore)
- **Routing:** React Router DOM
- **Deployment:** Vercel

## 🚀 Approach
I chose a **Serverless Architecture** using Firebase to meet the requirement for a robust, secure, and running application within the timeline.
- **Firebase Authentication:** Handles secure user login/signup and session management.
- **Firestore Database:** Used for storing tasks. It provides real-time listeners, meaning the UI updates instantly when data changes.
- **Tailwind CSS:** Used for rapid, clean, and responsive UI development.

## ⚙️ Setup Instructions
To run this project locally:

### 1. Clone the repository
```bash
git clone https://github.com/raziya-023/Task-app.git
cd Task-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Ensure src/firebase.js exists with your configuration keys.

### 4. Run the App
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

## 📁 Project Structure
```
Task-app/
├── src/
│   ├── pages/          # Route pages (Login, Signup, Dashboard)
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── firebase.js     # Firebase configuration & initialization
├── public/             # Static assets
├── vercel.json         # Routing configuration for deployment
└── package.json        # Dependencies and scripts
```

## ✅ Test Cases (Verified)

| Feature | Test Case | Expected Result | Status |
|---------|-----------|----------------|--------|
| **Auth** | Sign Up with password < 6 chars | Show error toast "Password must be at least 6 characters" | ✅ Pass |
| **Auth** | Sign Up with valid data | Redirect to Login page | ✅ Pass |
| **Auth** | Login with invalid creds | Show error toast "Invalid email or password" | ✅ Pass |
| **CRUD** | Add Task | Task appears in list immediately (Real-time) | ✅ Pass |
| **CRUD** | Edit Task | Clicking "Edit" turns text into input; "Save" updates DB | ✅ Pass |
| **CRUD** | Delete Task | Clicking "Delete" removes item from list and DB | ✅ Pass |
| **Routing** | Access Dashboard w/o Login | Redirects user back to Login page | ✅ Pass |

## 🎯 Features Implemented
- ✅ User Authentication (Sign Up / Login / Logout)
- ✅ Protected Routes (Dashboard accessible only after login)
- ✅ Create new tasks
- ✅ Edit existing tasks (inline editing)
- ✅ Delete tasks
- ✅ Real-time task updates across sessions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation and error handling
- ✅ Toast notifications for user feedback

## 🔐 Security Features
- Password validation (minimum 6 characters)
- Protected routes with authentication checks
- Firebase security rules for Firestore
- Environment variables for sensitive configuration

## 📱 Responsive Design
The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)

## 🐛 Known Issues / Future Improvements
- [ ] Add task priority levels (High, Medium, Low)
- [ ] Add task categories/tags
- [ ] Implement task search and filtering
- [ ] Add due dates for tasks
- [ ] Add task completion status toggle
- [ ] Implement password reset functionality
- [ ] Add user profile management

## 📝 Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📄 License
This project is created as part of the VirtuBox Assessment.

## 👤 Author
**Raziya**  
- GitHub: [@raziya-023](https://github.com/raziya-023)

---
