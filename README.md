# Visitor Registration System

A multi-language visitor registration system built with Vue.js and Docker. Features a professional welcome page with director profile and visitor form in 3 languages (Uzbek, Russian, English).

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Run in background:**
   ```bash
   docker-compose up -d
   ```

3. **Stop the containers:**
   ```bash
   docker-compose down
   ```

### Development

- The application runs on `http://localhost:5173`
- Hot module replacement (HMR) is enabled
- Code changes will automatically reload
- Mobile-responsive design

### Docker Commands

- **Build image:** `docker build -t visitor .`
- **Run container:** `docker run -p 5173:5173 visitor`
- **View logs:** `docker-compose logs -f app`

## 🛠️ Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Lightning fast build tool
- **Docker** - Containerized development
- **CSS Grid & Flexbox** - Modern responsive design

## 📁 Project Structure

```
visitor/
├── Dockerfile              # Docker image configuration
├── docker-compose.yml      # Multi-container setup
├── .dockerignore           # Files to exclude from Docker build
├── .gitignore              # Git ignore rules
├── package.json            # Vue.js dependencies
├── vite.config.js          # Vite configuration
├── index.html              # Main HTML file
├── src/
│   ├── assets/             # Images and static files
│   ├── components/
│   │   └── Welcome.vue     # Main welcome page component
│   ├── main.js            # Vue.js entry point
│   └── App.vue            # Main app component
└── README.md              # This file
```

## 🎨 Features

- **Multi-Language Support** - Uzbek, Russian, and English translations
- **Professional Layout** - Blue director panel + white registration form
- **Responsive Design** - Works on all device sizes
- **Modern UI** - Beautiful gradient design with centered layouts
- **Hot Reload** - Instant code updates during development
- **Docker Ready** - Containerized for consistent deployment

## 🖼️ Assets Setup

### Required Images
Place the following images in `src/assets/` folder:

1. **`profile.jpg`** - Director's profile photo
   - Recommended size: 100x100px (square format)
   - Professional headshot of Bo Inge Andersson

2. **`company-logo.jpg`** - Company logo or image
   - Recommended size: 400x120px
   - Company branding or relevant image

### Image Guidelines
- **Formats**: JPG, PNG, or WebP supported
- **File size**: Keep under 200KB for optimal loading
- **Naming**: Use exact filenames as listed above

### Current Status
- **Profile**: Shows "BA" initials placeholder
- **Company**: Shows "Image" text placeholder
- Replace with actual images when available

## 🌍 Language Support

The application supports three languages with complete translations:

- **🇺🇿 Uzbek (O'z)** - Default language
- **🇷🇺 Russian (Ру)** - Full Russian translation
- **🇬🇧 English (En)** - Complete English version

All text, labels, and messages automatically switch when language is changed. 