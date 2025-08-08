# Visitor Registration & Quiz System

A multi-language visitor registration and quiz system built with pure HTML, CSS, and JavaScript. Features a professional welcome page with director profile, visitor registration form, 10-question quiz, and certificate generation in 3 languages (Uzbek, Russian, English).

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - works with direct file access

### Running the Application

1. **Open the application:**
   - Simply double-click `index.html` to open in your browser
   - Or open `index.html` directly in any web browser

2. **Alternative methods:**
   - Use Live Server extension in VS Code
   - Use any local HTTP server (Python, Node.js, etc.)

### Development

- The application works with direct file access
- No build process required
- No dependencies to install
- Mobile-responsive design
- Cross-browser compatible

## 🛠️ Tech Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Grid & Flexbox
- **JavaScript (ES6+)** - Pure vanilla JavaScript
- **Local Storage** - Data persistence between pages
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
visitor/
├── index.html              # Welcome page (main entry point)
├── quiz.html              # Quiz page
├── certificate.html       # Certificate page
├── css/
│   ├── style.css         # Global styles
│   ├── welcome.css       # Welcome page styles
│   ├── quiz.css          # Quiz page styles
│   └── certificate.css   # Certificate page styles
├── js/
│   ├── translations.js   # Multi-language content
│   ├── welcome.js        # Welcome page functionality
│   ├── quiz.js           # Quiz functionality
│   └── certificate.js    # Certificate functionality
├── images/
│   ├── director.png      # Director's profile image
│   ├── building.jpg      # Company building image
│   └── logo.png         # Company logo
├── .gitignore            # Git ignore rules
└── README.md            # This file
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
1. **Welcome Page** (`index.html`) - Visitor registration
2. **Quiz Page** (`quiz.html`) - 10-question test
3. **Certificate Page** (`certificate.html`) - Results and certificate

## 🌐 Multi-Language Support

The application supports three languages:
- **Uzbek (O'z)** - Default language
- **Russian (Ру)** - Russian translation
- **English (En)** - English translation

All content, including:
- Welcome messages
- Form labels
- Quiz questions and answers
- Certificate text
- Navigation buttons

## 📱 Responsive Design

- **Desktop** - Full two-panel layout
- **Tablet** - Adaptive layout with maintained proportions
- **Mobile** - Single-column layout for optimal mobile experience

## 🎯 Key Features

### ✅ **Easy Deployment**
- No build process required
- Works with any web server
- Compatible with GitHub Pages, Netlify, Vercel
- Direct file access support

### ✅ **Professional Structure**
- Modular CSS files
- Organized JavaScript
- Clean HTML structure
- Separation of concerns

### ✅ **Cross-Browser Compatible**
- Works in all modern browsers
- Progressive enhancement
- Graceful degradation
- No framework dependencies

## 🚀 Deployment Options

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main` or `gh-pages`)

### Netlify
1. Connect GitHub repository to Netlify
2. Build command: (leave empty - no build required)
3. Publish directory: `.` (root directory)

### Local Development
1. Clone the repository
2. Open `index.html` in browser
3. Start developing!

## 📝 Usage

1. **Open the application** by double-clicking `index.html`
2. **Select language** using the dropdown in the top-right
3. **Fill out the registration form** with visitor information
4. **Complete the 10-question quiz** about UzAutoMotors
5. **View results** - Pass (8+ correct) or Fail
6. **Print certificate** if passed (direct browser print)

## 🔧 Customization

### Adding New Languages
1. Edit `js/translations.js`
2. Add new language object with all translations
3. Update language selector in HTML files

### Modifying Questions
1. Edit `js/quiz.js`
2. Update the `questions` array
3. Add corresponding translations in `translations.js`

### Styling Changes
1. Modify CSS files in the `css/` directory
2. Global styles in `style.css`
3. Page-specific styles in respective CSS files

## 📄 License

This project is for internal use at UzAutoMotors R&D Center.

## 🤝 Contributing

For internal development team use only. 