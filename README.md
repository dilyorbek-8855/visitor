# Visitor Registration & Quiz System

A multi-language visitor registration and quiz system built with Vue.js and Docker. Features a professional welcome page with director profile, visitor registration form, 10-question quiz, and certificate generation in 3 languages (Uzbek, Russian, English).

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
├── public/                 # Static assets
│   ├── director.png        # Director's profile image
│   ├── building.jpg        # Company building image
│   └── logo.png           # Company logo
├── src/
│   ├── components/
│   │   ├── Welcome.vue     # Welcome page component
│   │   ├── Quiz.vue        # Quiz page component
│   │   └── Certificate.vue # Certificate page component
│   ├── main.js            # Vue.js entry point
│   └── App.vue            # Main app component
└── README.md              # This file
```

## 🎨 Features

### 📋 Welcome Page
- **Multi-Language Support** - Uzbek, Russian, and English translations
- **Professional Layout** - Blue director panel + white registration form
- **Responsive Design** - Works on all device sizes
- **Modern UI** - Beautiful gradient design with centered layouts
- **Director Profile** - Displays director image with fallback initials
- **Company Logo** - Professional branding integration

### 🧠 Quiz System
- **10 Static Questions** - Multi-language questions about UzAutoMotors
- **Progress Tracking** - Real-time progress bar (0-100%)
- **Score Calculation** - Automatic scoring with pass/fail logic
- **Navigation** - Previous/Next question navigation
- **Validation** - Ensures all questions are answered
- **Passing Score** - 8 out of 10 questions required to pass

### 🏆 Certificate System
- **Dedicated Certificate Page** - Beautiful certificate display
- **Professional Design** - Matches provided certificate template
- **R&D Center Branding** - Research & Development Center branding
- **Print Functionality** - Direct browser print integration
- **Certificate Number** - Auto-generated unique certificate numbers
- **Social Media Integration** - @uzauto_rd_center handles
- **Multi-language Support** - Certificate text in all languages

### 🔄 Navigation Flow
1. **Welcome Page** → Visitor registration
2. **Quiz Page** → 10-question test
3. **Certificate Page** → View/print certificate (if passed)

## 🖼️ Assets Setup

### Required Images
Place the following images in `public/` folder:

1. **`director.png`** - Director's profile photo
   - Recommended size: 200x200px (square format)
   - Professional headshot of director

2. **`building.jpg`** - Company building image
   - Used on quiz page background
   - Company facility or relevant image

3. **`logo.png`** - Company logo
   - Used in certificate and welcome page
   - Company branding logo

### Image Guidelines
- **Formats**: PNG, JPG supported
- **File size**: Keep under 500KB for optimal loading
- **Naming**: Use exact filenames as listed above
- **Location**: All images go in `public/` folder

## 🌍 Language Support

The application supports three languages with complete translations:

- **🇺🇿 Uzbek (O'z)** - Default language
- **🇷🇺 Russian (Ру)** - Full Russian translation  
- **🇬🇧 English (En)** - Complete English version

### Translation Coverage
- **Welcome Page**: Registration form, labels, buttons
- **Quiz System**: Questions, answers, navigation, progress
- **Certificate**: All certificate text and labels
- **Navigation**: All button text and messages

## 🎯 Quiz Content

### Question Topics
- UzAutoMotors company information
- Manufacturing processes
- Company history and achievements
- Industry knowledge
- Safety and quality standards

### Scoring System
- **Total Questions**: 10
- **Passing Score**: 8 correct answers (80%)
- **Certificate**: Awarded for passing score
- **Progress Bar**: Real-time completion tracking

## 🖨️ Certificate Features

### Design Elements
- **Blue Gradient Background** - Professional certificate styling
- **Diagonal Lines** - Decorative background pattern
- **R&D Center Header** - Research & Development Center branding
- **Visitor Name** - Large, bold uppercase display
- **Score Badge** - Green badge showing quiz results
- **Certificate Number** - Unique auto-generated number
- **Director Signature** - Signature line with director name
- **Social Media** - @uzauto_rd_center handles

### Print Functionality
- **Direct Print** - Browser print dialog integration
- **Print-Optimized CSS** - Clean layout for printing
- **No Download Required** - Simplified user experience

## 🚀 Development Features

- **Hot Reload** - Instant code updates during development
- **Docker Ready** - Containerized for consistent deployment
- **Component Architecture** - Modular Vue.js components
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Graceful fallbacks for missing assets 