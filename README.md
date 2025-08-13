# Visitor Registration System

A modern, multi-language visitor registration and quiz system built with Vue.js 3, featuring a professional certificate generation system.

## ✨ Features

- **Multi-language Support**: Uzbek, Russian, and English
- **Visitor Registration**: Collect visitor information with form validation
- **Interactive Quiz**: 10-question test with progress tracking
- **Smart Certificate System**: 
  - Website version: Shows director name and title
  - Printed version: Includes QR code for verification
- **QR Code Verification**: Scan to verify certificate authenticity
- **Responsive Design**: Works on all devices
- **Docker Support**: Easy deployment and development

## 🏗️ Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

## 📁 Project Structure

```
visitor/
├── src/
│   ├── assets/
│   │   └── images/          # All project images
│   │       ├── building.jpg
│   │       ├── certificate.png
│   │       ├── director.png
│   │       └── logo.png
│   ├── components/          # Vue components
│   │   ├── Welcome.vue      # Registration form
│   │   ├── Quiz.vue         # Quiz interface
│   │   └── Certificate.vue  # Certificate display
│   ├── stores/              # Pinia stores
│   │   ├── visitor.js       # Visitor data & quiz state
│   │   └── translations.js  # Multi-language texts
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── Dockerfile               # Docker image configuration
├── docker-compose.yml       # Docker services orchestration
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
└── index.html               # HTML entry point
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd visitor
```

### 2. Start the Application
```bash
docker-compose up --build
```

### 3. Access the Application
Open your browser and navigate to: `http://localhost:5173`

## 🛠️ Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 🌍 Multi-language Support

The application supports three languages:
- **Uzbek (O'z)**: Primary language
- **Russian (Ру)**: Secondary language  
- **English (En)**: International language

All text content is centralized in `src/stores/translations.js` for easy maintenance.

## 📝 Quiz System

- **10 Questions**: Static questions in all three languages
- **Progress Tracking**: Visual progress bar with percentage
- **Scoring**: Pass threshold set at 8/10 correct answers
- **Navigation**: Previous/Next buttons with proper state management

## 🎓 Certificate System

### Website Display
- Certificate title and purpose
- Recipient name
- Issuing authority
- Director name and title
- Professional appearance

### Printed Version
- All certificate content
- QR code for verification
- Clean, printable layout
- No action buttons

### QR Code Features
- Links to certificate verification page
- Includes visitor name and certificate ID
- Works on both localhost and production servers
- Automatic domain detection

## 🔄 Data Flow

1. **Welcome Page**: Collects visitor information
2. **Quiz Page**: Administers test and tracks progress
3. **Certificate Page**: Generates and displays certificate
4. **Pinia Store**: Manages all application state
5. **Local Storage**: Persists data between sessions

## 🎨 Styling

- **Modern CSS**: Flexbox, Grid, and modern features
- **Responsive Design**: Mobile-first approach
- **Print Media Queries**: Optimized for printing
- **Professional Layout**: Two-panel design with proper spacing

## 🐳 Docker Management

### Useful Commands
```bash
# Start application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Rebuild and start
docker-compose up --build

# Check container status
docker ps
```

### Container Details
- **Name**: `visitor-frontend`
- **Port**: `5173`
- **Volume Mounting**: Live code reloading
- **Environment**: Development mode

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Production
```bash
# Update Dockerfile for production
docker build -t visitor-app .
docker run -p 80:80 visitor-app
```

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Development/Production mode
- `VITE_APP_TITLE`: Application title
- `VITE_API_URL`: API endpoint (if needed)

### Vite Configuration
- Host: `0.0.0.0` (Docker compatibility)
- Port: `5173`
- Polling: Enabled for Docker development

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository. 