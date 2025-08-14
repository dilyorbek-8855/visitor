# Visitor Registration System - Vue.js

A modern, multilingual visitor registration system with interactive quiz functionality and professional certificate generation, built with Vue.js 3 and Vite.

## 🌟 **Features**

### **Multi-language Support**
- **Uzbek** (O'zbekcha)
- **Russian** (Русский) 
- **English**

### **Smart Form System**
- **Simplified Registration**: Name and Surname only (no middle name required)
- **Automatic Language Detection**: Remembers user's language preference
- **Form Validation**: Ensures all required fields are completed

### **Interactive Quiz System**
- **10 Questions**: Comprehensive knowledge assessment
- **Real-time Scoring**: Immediate feedback on answers
- **Progress Tracking**: Visual progress indicator
- **Pass/Fail Logic**: 8+ correct answers required to pass

### **Professional Certificate Generation**
- **Dual Certificate System**: 
  - **Web Version**: Displays director signature and information
  - **Print Version**: Optimized for printing with QR code
- **QR Code Integration**: Each certificate has a unique QR code
- **Automatic Layout Switching**: Seamless transition between web and print views
- **Professional Design**: Clean, corporate appearance

### **QR Code Features**
- **Unique URLs**: Each certificate has a shareable link
- **Verification System**: QR codes can be scanned to verify certificates
- **Mobile Friendly**: Easy access from any device

## 🚀 **Technology Stack**

- **Frontend**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: CSS3 with responsive design
- **Deployment**: GitHub Pages

## 🏗️ **Project Structure**

```
visitor/
├── src/
│   ├── components/
│   │   ├── Welcome.vue          # Registration form
│   │   ├── Quiz.vue            # Interactive quiz
│   │   └── Certificate.vue     # Certificate generation
│   ├── stores/
│   │   ├── visitor.js          # Visitor data management
│   │   └── translations.js     # Multi-language support
│   ├── assets/
│   │   └── images/             # Certificate backgrounds
│   └── main.js                 # App entry point
├── dist/                        # Built files for deployment
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🎯 **Key Improvements**

### **Dual Certificate System**
- **Problem Solved**: QR code no longer overlaps with director signature
- **Two Optimized Layouts**: 
  - `certificate-web.png` - For web display with signature
  - `certificate-print.png` - For print with QR code space
- **Automatic Switching**: No manual intervention needed

### **Form Simplification**
- **Removed Middle Name**: Cleaner, simpler registration
- **Better UX**: Faster completion, less confusion
- **Maintained Validation**: Still ensures data quality

### **GitHub Pages Deployment**
- **Static Hosting**: No backend required
- **Automatic Updates**: Easy deployment from main branch
- **Professional URLs**: `https://username.github.io/visitor/`

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 16+ 
- npm or yarn
- Docker (optional, for containerized development)

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/dilyorbek-8855/visitor.git
cd visitor

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### **Docker Development**
```bash
# Build and run with Docker
docker-compose up --build

# Access at http://localhost:5173
```

### **Build for Production**
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🌐 **Deployment**

### **GitHub Pages**
```bash
# Deploy to GitHub Pages
npm run deploy

# Your site will be available at:
# https://username.github.io/visitor/
```

### **Manual Deployment**
1. Build the project: `npm run build`
2. Upload `dist/` folder contents to your web server
3. Ensure your server supports Single Page Applications (SPA)

## 🔧 **Configuration**

### **Vite Configuration**
The project is configured for both local development and GitHub Pages deployment:
- **Local**: Uses root paths (`/`)
- **Production**: Uses relative paths (`./`) for GitHub Pages compatibility

### **Language Configuration**
Add new languages by updating `src/stores/translations.js`:
```javascript
newLanguage: {
  welcomeTitle: 'Welcome',
  lastName: 'Last Name',
  firstName: 'First Name',
  // ... other translations
}
```

## 📱 **Responsive Design**

- **Desktop**: Full-featured layout with side panels
- **Tablet**: Optimized for medium screens
- **Mobile**: Touch-friendly interface with stacked layout

## 🎨 **Customization**

### **Certificate Design**
- **Web Version**: Modify `certificate-web.png` for signature area
- **Print Version**: Modify `certificate-print.png` for QR code layout
- **Text Positioning**: Adjust CSS for different text layouts

### **Styling**
- **Colors**: Update CSS variables in component files
- **Fonts**: Modify font families in CSS
- **Layout**: Adjust component positioning and spacing

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Blank Page on GitHub Pages**
- Ensure `vite.config.js` has correct base path
- Check that assets use relative paths (`./assets/`)
- Verify gh-pages branch contains all built files

#### **Certificate Images Not Loading**
- Verify both `certificate-web.png` and `certificate-print.png` exist
- Check file paths in `src/assets/images/`
- Ensure images are properly imported in components

#### **Language Not Persisting**
- Check browser localStorage settings
- Verify language detection logic in stores
- Ensure language is properly set in visitor store

### **Debug Mode**
The certificate component includes a debug toggle to preview both web and print versions:
- **Checkbox**: Toggle between web and print layouts
- **Console Logs**: Check browser console for debugging info

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Vue.js Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Pinia Team** for state management
- **GitHub Pages** for free hosting

## 📞 **Support**

For questions or issues:
- **Repository**: [https://github.com/dilyorbek-8855/visitor](https://github.com/dilyorbek-8855/visitor)
- **Live Demo**: [https://dilyorbek-8855.github.io/visitor/](https://dilyorbek-8855.github.io/visitor/)

---

**Built with ❤️ using Vue.js 3 and modern web technologies** 