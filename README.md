# 📝 MERN Notes App

A beautiful, full-featured notes application built with the MERN stack (MongoDB, Express, React, Node.js). Features include authentication, real-time search, tags, pin/archive functionality, and a stunning dark mode UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Automatic token refresh handling

### 📝 Notes Management
- ✅ Create, read, update, and delete notes
- 📌 Pin important notes to the top
- 📦 Archive notes for later reference
- 🏷️ Organize with custom tags
- 🔍 Real-time search across title and content
- 🗑️ Soft delete with restore capability

### 🎨 UI/UX Excellence
- 🌓 Light/Dark mode with system preference detection
- 📱 Fully responsive mobile-first design
- ⚡ Smooth animations with Framer Motion
- ⌨️ Keyboard shortcuts (⌘K for search, ⌘S to save)
- 🎯 Optimistic UI updates
- 💀 Skeleton loaders for better UX
- 🎭 Beautiful empty states
- 🔔 Toast notifications
- ♿ Accessible with ARIA labels and keyboard navigation

## 🚀 Demo

![App Screenshot](https://via.placeholder.com/800x450?text=Add+Your+Screenshot+Here)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin support

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/notes-app.git
cd notes-app
```

### 2. Install dependencies
```bash
# Install root dependencies (optional, for running both concurrently)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas**, replace `MONGO_URI` with your connection string:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app?retryWrites=true&w=majority
```

#### Frontend Environment Variables

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB (if using local installation)
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

### 5. Run the Application

#### Option A: Run Both Together (Recommended)
```bash
# From root directory
npm run dev
```

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 📁 Project Structure
```
notes-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── error.js              # Error handling
│   ├── models/
│   │   ├── User.js               # User model
│   │   └── Note.js               # Note model
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── notes.js              # Notes routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Sidebar.jsx       # Filter sidebar
│   │   │   ├── NoteCard.jsx      # Note card component
│   │   │   ├── NoteForm.jsx      # Note form
│   │   │   ├── Modal.jsx         # Modal component
│   │   │   ├── Loader.jsx        # Loading spinner
│   │   │   └── Toast.jsx         # Toast notifications
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Auth state
│   │   │   └── UIContext.jsx     # UI state (theme, toast)
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   └── Profile.jsx       # User profile
│   │   ├── utils/
│   │   │   └── axios.js          # Axios config
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
├── package.json                  # Root package
└── README.md
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Notes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all notes | Yes |
| GET | `/api/notes/:id` | Get single note | Yes |
| POST | `/api/notes` | Create note | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

#### Query Parameters for GET `/api/notes`

- `search` - Search in title/content
- `pinned` - Filter by pinned status (true/false)
- `archived` - Filter by archived status (true/false)
- `tag` - Filter by specific tag

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open search |
| `Cmd/Ctrl + S` | Save note |
| `Cmd/Ctrl + N` | New note |
| `Escape` | Close modal/search |

## 🎨 Features in Detail

### Dark Mode
- Automatic system preference detection
- Manual toggle with persistent storage
- Smooth transition animations
- Optimized color contrast for accessibility

### Search & Filter
- Real-time debounced search
- Filter by pinned/archived status
- Filter by tags
- Sort by pinned status and date

### Notes Organization
- Pin important notes to stay at the top
- Archive completed notes
- Add multiple tags per note
- Soft delete with ability to restore

## 🧪 Testing
```bash
# Backend tests (coming soon)
cd backend
npm test

# Frontend tests (coming soon)
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

1. Update `frontend/.env` with production API URL
2. Build the app: `npm run build`
3. Deploy the `dist` folder

### Environment Variables for Production

Don't forget to set these in your hosting platform:

**Backend:**
- `MONGO_URI`
- `JWT_SECRET`
- `NODE_ENV=production`
- `CLIENT_URL` (your frontend URL)

**Frontend:**
- `VITE_API_URL` (your backend URL)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 TODO / Future Enhancements

- [ ] Rich text editor (Markdown support)
- [ ] Note sharing functionality
- [ ] Collaborative editing
- [ ] Export notes (PDF, Markdown)
- [ ] Note templates
- [ ] Reminders and notifications
- [ ] Voice notes
- [ ] Note attachments (images, files)
- [ ] Two-factor authentication
- [ ] Social login (Google, GitHub)
- [ ] Mobile app (React Native)

## 🐛 Known Issues

- None currently! Report issues [here](https://github.com/YOUR_USERNAME/notes-app/issues)

## 👨‍💻 Author

**Your Name**
- GitHub: [Asry](https://github.com/AsryAhamed)
- LinkedIn: [Asry Ahamed](https://www.linkedin.com/in/asry-ahamed-41664b218/)
- Email: asry.bsc@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 📸 Screenshots

### Light Mode
![Light Mode Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Light+Mode)

### Dark Mode
![Dark Mode Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Dark+Mode)

### Mobile View
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

Made with ❤️ and ☕
