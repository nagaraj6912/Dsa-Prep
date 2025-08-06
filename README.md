# Skillcraft - DSA Learning Tracker

A comprehensive Data Structures and Algorithms learning platform built with modern web technologies.

## 🚀 Features

- **Interactive Learning Path**: Structured DSA chapters with progress tracking
- **Progress Analytics**: Visual progress indicators and difficulty-based tracking
- **User Authentication**: Secure login system with admin controls
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark/Light Theme**: Toggle between themes for comfortable learning
- **Real-time Updates**: Instant progress synchronization
- **Code Execution**: Run and test your code directly in the browser using Judge0 API
- **Test Cases**: Automated test case validation for each problem

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Firebase (Database & Authentication)
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Charts**: Recharts for analytics
- **Icons**: Lucide React
- **Code Execution**: Judge0 API for running code in multiple languages
- **Code Editor**: Monaco Editor for a VS Code-like experience

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditya-dev-projects/Project-Dsa-Roadmap.git
   cd Project-Dsa-Roadmap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the `.env.example` file to create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Then update the values in the `.env` file with your Firebase configuration:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   
   # Admin User ID
   VITE_ADMIN_USER_ID=your_admin_user_id
   
   # Judge0 API Key (for code execution)
   VITE_JUDGE0_API_KEY=your_judge0_api_key
   ```
   
   For detailed Firebase setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   
   For Firestore index setup instructions, see [FIRESTORE_INDEX.md](./FIRESTORE_INDEX.md)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── data/          # Static data and constants
└── integrations/  # External service integrations
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with one click

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for client-side routing

### Manual Deployment

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: https://github.com/aditya-dev-projects/Project-Dsa-Roadmap
- **Live Demo**: [Coming Soon]

---

Built with ❤️ for the DSA learning community
