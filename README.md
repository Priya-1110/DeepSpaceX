# DeepSpaceX: NASA Explorer Web App

**Live Demo:** [https://deepspacex.vercel.app](https://deepspacex.vercel.app)
**Backend API:** [https://deepspacex.onrender.com](https://deepspacex.onrender.com)

---

## ✨ Overview

DeepSpaceX is a fully responsive, visually rich, and interactive space-themed web application that integrates multiple NASA APIs to provide real-time space data including:

* Astronomy Picture of the Day (APOD)
* Mars Rover imagery
* EPIC Earth images
* Near-Earth Object (NEO) tracking
* Space weather alerts from the DONKI system
* NASA Image & Video Library search

The app features a cosmic, neon-themed UI with sound FX, hover interactions, particle effects, animated backgrounds, and filterable data.

---

## 🚀 Features

### Core Functionality

* ✨ **Cinematic homepage** with animated profile selector and audio FX
* 📷 **APOD view**: High-res image with date & description
* 🚀 **Mars Rover Explorer** with camera filter & date support
* 🌍 **EPIC Earth imagery** gallery with date filtering
* 📈 **NEO dashboard**: Real-time table with asteroid data
* ☀️ **DONKI alerts**: Filterable space weather alerts (RBE, CME, SEP, FLR)
* 📚 **NASA Library Search** with keyword-based image fetching

### Bonus UI/UX Features

* Responsive mobile-first layout
* Cosmic particle and galaxy background
* Toggleable background music with volume control
* Animated intro: "Initializing Launch Sequence..."
* Mystery riddle tiles for navigation
* Glow-on-hover tiles with orbiting effects

---

## 🌐 Tech Stack

### Frontend:

* React.js
* Vite
* Tailwind CSS (sci-fi theme)
* Framer Motion
* React Icons
* react-router-dom

### Backend:

* Node.js
* Express.js
* Deployed on Render

### APIs Used:

* [NASA APOD API](https://api.nasa.gov/)
* [NASA Mars Rover Photos API](https://api.nasa.gov/)
* [NASA EPIC API](https://epic.gsfc.nasa.gov/)
* [NASA NEO Feed API](https://api.nasa.gov/)
* [NASA DONKI API](https://api.nasa.gov/)
* [NASA Image & Video Library API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

---

## 🚧 Installation & Development

### Prerequisites

* Node.js & npm
* Vite (for frontend)
* .env file with your NASA API key

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/deepspacex
cd deepspacex
```

### 2. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Set up environment variables

In `/backend/.env`:

```env
NASA_API_KEY=your_nasa_api_key_here
```

### 4. Run the backend

```bash
cd backend
npm start
```

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 Deployment

### Frontend (Vercel)

* Connect your GitHub repo
* Set `REACT_APP_BACKEND_URL` in Vercel env vars

### Backend (Render)

* Add `NASA_API_KEY` in Render dashboard
* Deploy with `npm start` or auto deploy from GitHub


## 📚 Credits

* NASA Open APIs
* Sound FX: freesound.org
* Fonts: Orbitron, Rajdhani (Google Fonts)
* Background music: Space ambience loop

---

## 📊 License

This project is for educational and demonstration purposes only.

---

## ✈️ Author

Built with ❤️ by Priya Shanmugam 

---

Feel free to fork, star, and use DeepSpaceX as inspiration for your own NASA-themed applications!
